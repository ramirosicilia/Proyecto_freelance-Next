"use client" 

import React, {useEffect,useRef} from 'react'
import styles from "../nav/components/nav.module.css"
import Link from "next/link";
import "../../styles/global.css"


const Nav = () => { 

  const refNav=useRef() 

  useEffect(()=>{  



    const handle=()=>{  
          const y=window.scrollY 
          
       if(y>0 && refNav.current){ 

        refNav.current.style.display="none"

      } 

      else{
        refNav.current.style.display="flex"
      }

    }


    window.addEventListener("scroll",handle)

       return ()=>{
        window.removeEventListener("scroll",handle)

       } 

 
  },[])





  return (
    <div ref={refNav} className={styles.navContainer}>
        <Link className={styles.link} href="/">Home</Link>
        <Link className={styles.link} href="/services">Servicios</Link>
        <Link className={styles.link} href="/shifts">Turnos</Link>
        <Link className={styles.link} href="/projects">Proyectos</Link>
        <Link className={styles.link} href="/contact">Contacto</Link>
      

    </div>
  )
}

export default Nav
