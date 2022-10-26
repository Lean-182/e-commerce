import React from "react";
import styles from "./ProfileCard.module.css";
import { Link } from "react-router-dom";
//import  EditProfileFormulary  from "./editProfileFormulary";
/** Debemos agregar Componente para poder modificar El perfil de la persona usando el boton de 
  abajo 
 */

function ProfileCard({ email, name, lastName, image, address, phone }) {
  return (
    <div className={styles.productContainer}>
      
      <h2 className={styles.titulo}>Your Profile</h2>

      <section className={styles.informacionContainer}>
        <div className={styles.photoContainer}>
          <img src={`${image}`} alt="imagen" />
        </div>
        <div className={styles.InforContainerText}>
        <p><b>E-mail:</b>  {email}</p>
          <p><b>Name:</b>  {name}</p>
          <p><b>Lastname:</b>  {lastName}</p>
          <p><b>Adress:</b>   {address}</p>
          <p><b>Phone:</b>   {phone}</p>
        </div>
      </section>
    </div>
  );
}

export default ProfileCard;
