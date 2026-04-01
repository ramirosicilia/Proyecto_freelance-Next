"use client";

import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import styles from "../chat/components/chatBox.module.css";

const URLBackend = process.env.NEXT_PUBLIC_URL_BACKEND;
const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN; // 👈 agregado

const ChatBox = () => {
  
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [mostrarEmojis, setMostrarEmojis] = useState(false);

  const [grabando, setGrabando] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const sonido = useRef(null);

  const emojiRef = useRef(null);
  const socketRef = useRef(null);
  const primeraVez = useRef(true);
  const chatMensajesRef = useRef(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [typingUsers, setTypingUsers] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    sonido.current = new Audio("/noti.mp3");
  }, []);

  const [usuarioId] = useState(() => {
    if (typeof window === "undefined") return "";
    let idGuardado = localStorage.getItem("usuarioId");
    if (!idGuardado) {
      idGuardado = "user-" + Math.random().toString(36).substring(2, 9);
      localStorage.setItem("usuarioId", idGuardado);
    }
    return idGuardado;
  });

  const [nombreUsuario, setNombreUsuario] = useState(() => {
    if (typeof window === "undefined") return "";
    let n = localStorage.getItem("nombreChat");
    return n || "";
  });

  const [conversaciones, setConversaciones] = useState(() => {
    if (typeof window === "undefined") return ["global"];
    try {
      const raw = localStorage.getItem("conversaciones");
      return raw ? JSON.parse(raw) : ["global"];
    } catch {
      return ["global"];
    }
  });

  const [conversacionActiva, setConversacionActiva] = useState("global");

  useEffect(() => {
    localStorage.setItem("conversaciones", JSON.stringify(conversaciones));
  }, [conversaciones]);

  const [salasBorradasLocal, setSalasBorradasLocal] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("salasBorradasLocal");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "salasBorradasLocal",
      JSON.stringify(salasBorradasLocal)
    );
  }, [salasBorradasLocal]);

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.emit("joinRoom", conversacionActiva);
  }, [conversacionActiva]);

  useEffect(() => {
    if (!usuarioId) return;

    socketRef.current = io(URLBackend, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 2000,
      query: { usuarioId },
    });

    const s = socketRef.current;

    s.emit("joinRoom", "global");

    if (nombreUsuario) s.emit("setNombre", nombreUsuario);

    // 🔐 AUTO AUTH ADMIN (si existe token)
    if (ADMIN_TOKEN) {
      s.emit("authAdmin", { token: ADMIN_TOKEN });
    }

    s.on("authAdmin:ok", () => {
      setIsAdmin(true);
      console.log("ADMIN OK");
      alert("Autenticado como admin");
    });

    s.on("authAdmin:fail", () => {
      setIsAdmin(false);
      console.log("ADMIN FAIL");
      alert("Token inválido");
    });

    s.on("usuarios:lista", (lista) => {
      setOnlineUsers(lista);
    });

    s.on("historial", (hist) => {
      const clean = (hist || []).filter(
        (m) =>
          !m.deleted &&
          !salasBorradasLocal.includes(m.sala || "global")
      );
      setMensajes(clean);
    });

    s.on("chat:mensaje", (msg) => {
      setMensajes((prev) => [...prev, msg]);
      if (msg.usuarioId !== usuarioId && sonido.current)
        sonido.current.play();

      if (msg.sala && !conversaciones.includes(msg.sala)) {
        setConversaciones((p) => (p.includes(msg.sala) ? p : [...p, msg.sala]));
      }
    });

    s.on("chat:audio", (msg) => {
      setMensajes((prev) => [...prev, msg]);
      if (msg.usuarioId !== usuarioId && sonido.current)
        sonido.current.play();

      if (msg.sala && !conversaciones.includes(msg.sala)) {
        setConversaciones((p) => (p.includes(msg.sala) ? p : [...p, msg.sala]));
      }
    });

    s.on("typing", ({ usuarioId: uId, nombre }) => {
      setTypingUsers((prev) => ({ ...prev, [uId]: nombre || "Alguien" }));
    });

    s.on("stopTyping", ({ usuarioId: uId }) => {
      setTypingUsers((prev) => {
        const copy = { ...prev };
        delete copy[uId];
        return copy;
      });
    });

    s.on("messageDeleted", ({ id }) => {
      setMensajes((prev) =>
        prev.map((m) =>
          String(m._id) === String(id) || String(m.id) === String(id)
            ? { ...m, deleted: true }
            : m
        )
      );
    });

    // 🧨 NUEVO: limpiar sala
    s.on("roomCleared", ({ sala }) => {
      setMensajes((prev) =>
        prev.filter((m) => (m.sala || "global") !== sala)
      );
    });

    return () => s.disconnect();
  }, [usuarioId, salasBorradasLocal]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setMostrarEmojis(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mensajesFiltrados = mensajes.filter((m) => {
    const sala = m.sala || "global";
    return sala === conversacionActiva && !m.deleted;
  });

  useEffect(() => {
    if (primeraVez.current) {
      primeraVez.current = false;
      return;
    }

    const contenedor = chatMensajesRef.current;
    if (!contenedor) return;

    contenedor.scrollTo({
      top: contenedor.scrollHeight,
      behavior: "smooth",
    });
  }, [mensajesFiltrados]);

  const typingTimeout = useRef(null);

  const sendTyping = () => {
    const s = socketRef.current;
    if (!s) return;

    s.emit("typing", {
      sala: conversacionActiva,
      nombre: nombreUsuario || "Anon",
      usuarioId,
    });

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      s.emit("stopTyping", { sala: conversacionActiva, usuarioId });
    }, 2000);
  };

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (mensaje.trim() === "") return;

    if (!nombreUsuario) {
      const nuevo = prompt("Decime tu nombre para entrar al chat:");
      if (!nuevo) return;
      setNombreUsuario(nuevo);
      localStorage.setItem("nombreChat", nuevo);
      socketRef.current.emit("setNombre", nuevo);
    }

    const nuevoMsg = {
      tipo: "texto",
      texto: mensaje,
      hora: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      emisor: usuarioId,
      nombre: nombreUsuario || "Usuario",
      usuarioId,
      sala: conversacionActiva,
    };

    socketRef.current.emit("chat:mensaje", nuevoMsg);
    setMensaje("");
    socketRef.current.emit("stopTyping", {
      sala: conversacionActiva,
      usuarioId,
    });
  };

  const agregarEmoji = (emojiObj) => {
    setMensaje((prev) => prev + emojiObj.emoji);
    setMostrarEmojis(false);
  };

  return (
    <div className={styles["chat-container"]}>
      <div className={styles.sidebar}>
        <div className={styles["usuario-info"]}>
          <strong>Tu nombre:</strong> {nombreUsuario || "(sin nombre)"}
        </div>

        <div className={styles.conversaciones}>
          <ul>
            {conversaciones.map((c) => (
              <li key={c}>
                <button
                  className={
                    c === conversacionActiva ? styles.activo : ""
                  }
                  onClick={() => setConversacionActiva(c)}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles["chat-area"]}>
        <div
          className={styles["chat-mensajes"]}
          ref={chatMensajesRef}
        >
          {mensajesFiltrados.map((m, i) => (
            <div
              key={m._id || m.id || i}
              className={`${styles["chat-msg"]} ${
                m.usuarioId === usuarioId
                  ? styles.propio
                  : styles.otro
              }`}
            >
              <span className={styles.nombre}>
                {m.nombre || "Usuario"}:
              </span>
              <span className={styles.hora}> [{m.hora}]</span>

              {!m.deleted && (
                <>
                  {m.tipo === "texto" && <span> {m.texto}</span>}
                  {m.tipo === "audio" && (
                    <audio
                      controls
                      src={`data:audio/webm;base64,${m.audio}`}
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <form
          className={styles["chat-form"]}
          onSubmit={enviarMensaje}
        >
          <button
            type="button"
            className={styles["emoji-btn"]}
            onClick={() => setMostrarEmojis(!mostrarEmojis)}
          >
            😊
          </button>

          {mostrarEmojis && (
            <div
              ref={emojiRef}
              className={styles["emoji-picker"]}
            >
              <EmojiPicker onEmojiClick={agregarEmoji} />
            </div>
          )}

          <input
             className={styles.input}
            type="text"
            placeholder="Escribe un mensaje..."
            value={mensaje}
            onChange={(e) => {
              setMensaje(e.target.value);
              sendTyping();
            }}
            onFocus={() => {}}
          />

          <button type="submit">Enviar</button>

          {!grabando ? (
            <button
              type="button"
              className={styles["audio-btn"]}
            >
              🎤
            </button>
          ) : (
            <button
              type="button"
              className={styles["audio-btn-grabando"]}
            >
              ⏹️
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatBox;