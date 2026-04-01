
"use client";

import { useState, useEffect } from "react";
import styles from "../projects/components/project.module.css";
import "../styles/global.css";

const Projects = () => {
  const text = "Proyectos que hice para mis clientes";
  const [escritura, setEscritura] = useState("");
  const [index, setIndex] = useState(0);
  const [borrando, setBorrando] = useState(false);

  useEffect(() => {
    let timeout;

    if (!borrando && index < text.length) {
      timeout = setTimeout(() => {
        setEscritura((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 60); // más rápido = más pro
    } 
    else if (!borrando && index === text.length) {
      timeout = setTimeout(() => setBorrando(true), 1500);
    } 
    else if (borrando && index > 0) {
      timeout = setTimeout(() => {
        setEscritura((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      }, 30);
    } 
    else if (borrando && index === 0) {
      setBorrando(false);
    }

    return () => clearTimeout(timeout);
  }, [index, borrando, text]);

  const proyectos = [
    {
      titulo: "Tienda Online Profesional",
      descripcion:
        "Catálogo, carrito, pagos, control de stock y panel de administración para el dueño.",
      url: "#",
      imagen: "https://picsum.photos/500/300?1",
    },
    {
      titulo: "Agenda y Sistema de Turnos",
      descripcion:
        "Turnos automáticos, recordatorios y panel completo para gestión de clientes.",
      url: "#",
      imagen: "https://picsum.photos/500/300?2",
    },
    {
      titulo: "Panel de Estadísticas",
      descripcion:
        "Dashboard con métricas en tiempo real, reportes y exportación avanzada.",
      url: "#",
      imagen: "https://picsum.photos/500/300?3",
    },
    {
      titulo: "Chat Empresarial",
      descripcion:
        "Chat interno con roles, grupos, archivos y comunicación en tiempo real.",
      url: "#",
      imagen: "https://picsum.photos/500/300?4",
    },
    {
      titulo: "Landing Page de Alto Impacto",
      descripcion:
        "Diseñada para convertir visitas en clientes con UX optimizada.",
      url: "#",
      imagen: "https://picsum.photos/500/300?5",
    },
  ];

  return (
    <section className={styles.section} id="proyectos">
      <div className={styles.container}>
        
        {/* HEADER */}
        <div>
          <span className={styles.subtitle}>Trabajo Real</span>

          <h1 className={styles.title}>
            {escritura}
            <span className={styles.cursor}>|</span>
          </h1>

          <p className={styles.description}>
            Me enfoco en crear soluciones reales: sitios web, plataformas,
            sistemas y herramientas que generan resultados.
          </p>
        </div>

        {/* GRID */}
        <div className={styles.grid}>
          {proyectos.map((proyecto, index) => (
            <a
              href={proyecto.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              key={index}
            >
              
              {/* IMAGEN */}
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url(${proyecto.imagen})`,
                }}
              />

              {/* OVERLAY (pro visual) */}
              <div className={styles.overlayCard} />

              {/* CONTENIDO */}
              <div className={styles.content}>
                <h3>{proyecto.titulo}</h3>
                <p>{proyecto.descripcion}</p>
              </div>

            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;