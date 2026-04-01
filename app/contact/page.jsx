
"use client";
import React, { useState } from "react";
import styles from "../contact/components/contact.module.css"


const Contact = () => {
  const URLBack = process.env.NEXT_PUBLIC_URL;

  const [form, SetForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [error, SetError] = useState({});
  const [status, SetStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    SetForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verificarForm = verificarFormulario(form);

    if (Object.keys(verificarForm).length > 0) {
      SetError(verificarForm);
      SetStatus({ type: "error", message: "complete los campos" });
      return;
    }

    SetError({});
    SetStatus({ type: "enviando", message: "enviando el mensaje" });

    const datos = new FormData(e.target);

    try {
      const response = await fetch(URLBack, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: datos,
      });

      console.log(response);

      if (!response.ok) {
        SetStatus({ type: "error", message: "no se mando la solicitud" });
      } else {
        SetStatus({ type: "enviado", message: "mensaje enviado con exito" });

        SetForm({
          nombre: "",
          email: "",
          mensaje: "",
        });
      }
    } catch (error) {
      SetStatus({
        type: "error",
        message: "error al recibir de la base de datos",
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <section id="contacto">
        <h3 className={styles.titulo}>Contacto</h3>

        <div className={styles.flex}>
          <form method="POST" className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre
            </label>
            <input
              name="nombre"
              value={form.nombre}
              required
              className={styles.input}
              onChange={handleChange}
            />
            {error.nombre && <p className={styles.error}>{error.nombre}</p>}

            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              value={form.email}
              name="email"
              required
              className={styles.input}
              onChange={handleChange}
            />
            {error.email && <p className={styles.error}>{error.email}</p>}

            <label htmlFor="mensaje" className={styles.label}>
              Mensaje
            </label>
            <textarea
              name="mensaje"
              value={form.mensaje}
              rows="4"
              required
              className={styles.textarea}
              onChange={handleChange}
            ></textarea>
            {error.mensaje && (
              <p className={styles.error}>{error.mensaje}</p>
            )}

            <div className={styles.submitBox}>
              <button type="submit" className={styles.btn}>
                Enviar mensaje
              </button>

              {status.type === "enviado" ||
              status.type === "enviando" ? (
                <p className={styles.success}>{status.message}</p>
              ) : (
                <p className={styles.error}>{status.message}</p>
              )}
            </div>
          </form>

          <div className={styles.info}>
            <h4 className={styles.infoTitle}>Contacto directo</h4>
            <p className={styles.infoText}>Tel: +54 11-3877-4224</p>
            <p className={styles.infoText}>
              Email: rama.sicilia@gmail.com
            </p>

            <div className={styles.horarioBox}>
              <strong className={styles.horarioTitle}>Horarios</strong>
              <p className={styles.horarioText}>
                Lun-Vie 9:00-18:00 · Respuesta 24hs
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          © <strong>Ramiro Sicilia / Agencia</strong> — Desarrollo web &
          e-commerce
        </div>
      </footer>

      <a
        className={styles.whatsappBtn}
        href="https://wa.me/541138774224?text=Hola%20%E2%9C%85%20Quisiera%20un%20presupuesto%20para%20mi%20Web"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        Contactar
      </a>
    </div>
  );
};

export default Contact;