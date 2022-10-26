import React from 'react'
import s from "./Home.module.css"
// import hombre from "../image/Hombre.png"
// import mujer from "../image/Mujer.png"
import mujer3 from "../image/Mujer3.png"
// import mujer2 from "../image/Foto.png"
// import gift from "../image/gift.jpg"
// import foto from "../image/qwe.png"

export const Home = () => {
  return (
      <div className={s.container}>
        <div className={s.image}>
            {/* <img src={hombre}alt="#" /> */}
            {/* <img className={s.img} src={mujer3} alt= "#" width="45%" height="45%"/> */}
            {/* <img className={s.img} src={mujer2} alt= "#" width="45%" height="45%"/> */}
            {/* <img src={gift} alt="#" /> */}
            {/* <img src={foto} alt="#" /> */}
        </div>
    </div>
  )
}
