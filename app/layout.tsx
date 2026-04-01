
import Footer from "../app/components/footer/Footer"
import Header from "../app/components/header/Header"
import "../app/styles/global.css"

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desarrollador Full Stack | Páginas Web Económicas y Gratis | Profesor de JavaScript CSS",
  description:
    "Soy desarrollador full stack especializado en crear páginas web económicas y gratis. También soy profesor de JavaScript, CSS y desarrollo web. Desarrollo sitios rápidos, modernos y optimizados para SEO.",

  keywords: [
    "desarrollador full stack",
    "programador web",
    "paginas web economicas",
    "paginas web gratis",
    "crear pagina web argentina",
    "desarrollador freelance",
    "profesor javascript",
    "curso javascript",
    "aprender css",
    "programacion web",
    "desarrollo web",
  ],

  verification: {
    google: "osPihXAIgjjVkSJs_rm58fE_z34L5yMUxUM8nihmIl0",
  },

  openGraph: {
    title: "Desarrollador Web Full Stack | Páginas Web Económicas",
    description:
      "Creación de páginas web profesionales, económicas y optimizadas. Clases de JavaScript y CSS para todos los niveles.",
    url: "https://proyecto-freelance-next.vercel.app",
    siteName: "Desarrollador Full Stack",
    locale: "es_ES",
    type: "website",
  },

  metadataBase: new URL("https://proyecto-freelance-next.vercel.app/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}