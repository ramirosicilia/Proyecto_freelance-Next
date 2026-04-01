"use client"

import React, {useState}  from "react";
import Nav from "../nav/Nav"
import styles from "../header/components/header.module.css"



export default function Header(){
const [visible,SetVisible] = useState(false) 
   
   const aparecer=()=>{ 

    SetVisible(!visible) 

   }


 return (
  <div>
    <div className={styles.headerContainer}>
      
      <div className={styles.tituloContenedor}>
        <div className={styles.tituloLinea}>
          <h1 className={styles.titulo}>Desarrollador Web: Ramiro Sicilia</h1>

          <span className={visible ? styles.aparecer : styles.ocultar}>
            Pedime un turno para un asesoramiento personalizado! clickea en turnos
          </span>
        </div>

        <button className={styles.btnMagico}onClick={aparecer}>
          Hace click aqui
        </button>
      </div>

      <Nav />
    </div>
  </div>
);


}