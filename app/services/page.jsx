

"use client";

import React from "react";
import styles from "../services/components/services.module.css"; // 👈 cambio clave
import foto2 from "../assets/images/foto2.jpg";
import Link from "next/link";
import Image from "next/image";

const Services = () => {
  return (
    <div>
      <div className={styles.page}>

        <header className={styles.hero} role="banner">
          <div className={styles["hero-content"]}>
            <div className={styles.eyebrow}>
              Servicios — Desarrollador Full-Stack
            </div>

            <h1 className={styles["hero-title"]}>
              Construyo tiendas online y experiencias de compra que venden
            </h1>

            <p className={styles["hero-sub"]}>
              Diseño e implemento e-commerce con integraciones de pago (MercadoPago, Stripe, PayPal),
              páginas de producto optimizadas, pasarelas seguras y soluciones a medida para tu negocio.
            </p>

            <div className={styles["hero-cta"]}>
              <a className={styles.btn} href="#contacto">Solicitar presupuesto</a>
              <a className={`${styles.btn} ${styles.secondary}`} href="#servicios">
                Ver servicios
              </a>
            </div>

            <div className={styles.urgent}>
              <strong>¿Urgente?</strong> Escribime por WhatsApp y te respondo en menos de 24hs.
            </div>
          </div>

          <div className={styles["hero-media"]}>
            <div className={styles.banner}>
              <Image 
                src={foto2} 
                alt="Imagen de ejemplo"
                width={500}
                height={300}
                priority
              />
            </div>
          </div>
        </header>

        <section id="servicios">
          <h2 className={styles["section-title"]}>Qué ofrezco</h2>

          <div className={styles.cards}>

            <article className={styles.card}>
              <h3>E-commerce completo</h3>
              <p>
                Tiendas desde cero (Shopify / WooCommerce / Headless / Next.js).
              </p>
              <div className={styles.capabilities}>
                Integraciones, envíos, SEO.
              </div>
            </article>

            <article className={styles.card}>
              <h3>Integración de pagos</h3>
              <p>
                MercadoPago, Stripe, PayPal y webhooks.
              </p>
              <div className={styles.capabilities}>
                Seguridad y manejo de errores.
              </div>
            </article>

            <article className={styles.card}>
              <h3>Páginas personalizadas</h3>
              <p>
                Landing pages optimizadas y rápidas.
              </p>
              <div className={styles.capabilities}>
                UI enfocada en conversión.
              </div>
            </article>

          </div>
        </section>

        <section className={styles["two-col"]}>

          <div className={styles.process}>
            <h3 className={styles["process-title"]}>Mi proceso</h3>

            <ol>
              <li><strong>Brief:</strong> Reunión inicial</li>
              <li><strong>Plan:</strong> Roadmap</li>
              <li><strong>Build:</strong> Desarrollo</li>
              <li><strong>Go-Live:</strong> Deploy</li>
            </ol>
          </div>

          <aside className={styles.trust}>
            <h4 className={styles["trust-title"]}>¿Por qué trabajar conmigo?</h4>

            <ul className={styles["trust-list"]}>
              <li>ROI y velocidad</li>
              <li>Experiencia real</li>
              <li>Comunicación clara</li>
            </ul>
          </aside>

        </section>

        <section className={styles.cta}>

          <div>
            <h3 className={styles["cta-title"]}>¿Listo para vender más?</h3>
            <p className={styles["cta-sub"]}>
              Pide un presupuesto sin compromiso.
            </p>
          </div>

          <div className={styles["cta-buttons"]}>
              <a 
                className={styles.btn}
                href="https://wa.me/5491138774224"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar presupuesto
              </a>
            <Link className={`${styles.btn} ${styles.secondary}`} href="/services/paquetes">
              Ver paquetes
            </Link>

          </div>

        </section>

      </div>
    </div>
  );
};

export default Services;