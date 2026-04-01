

"use client";

import { useState, useEffect } from "react";
import imagen1 from "../../assets/images/foto1.jpg";
import imagen2 from "../../assets/images/foto2.jpg";
import imagen3 from "../../assets/images/foto3.jpg";
import imagen4 from "../../assets/images/foto4.avif";
import styles from "../sliders/components/slider.module.css";
import Image from "next/image";

const Slider = () => {
  const [index, setIndex] = useState(0);

  const imagenes = [imagen1, imagen2, imagen3, imagen4];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return ( 
    
    <div className={styles.container}>
        <div className={styles.contenedor}>
        <div className={styles.containerImagenes}>
        <Image
          className={`${styles.imagenes} ${styles["slide-center"]}`}
          src={imagenes[index]}
          alt="Imagen del slider"
           priority  
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
    </div>
  );
};

export default Slider;