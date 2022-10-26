import React from "react";
import "./profileCard.css";
import { Link } from "react-router-dom";
// import EditProfileFormulary from "./editProfileFormulary";
/** Debemos agregar Componente para poder modificar El perfil de la persona usando el boton de 
  abajo 
 */

function ProfileCard({ email, name, lastName, image, address, phone }) {
  return (
    <div className="profileCardContainer">
      <div className="productContainer">
        <h2 className="titulo">Your Profile</h2>

        <section className="informacionContainer">
          <div className="photoContainer">
            <img src={`${image}`} alt="imagen" />
          </div>
          <div className="InforContainerText">
            <p>
              <b>E-mail:</b> {email}
            </p>
            <p>
              <b>Name:</b> {name}
            </p>
            <p>
              <b>Lastname:</b> {lastName}
            </p>
            <p>
              <b>Adress:</b> {address}
            </p>
            <p>
              <b>Phone:</b> {phone}
            </p>
          </div>
        </section>

        <div className="buttonModify">
          <Link to={"./editProfileFormulary"}>
            <button className="buttonChangePass">
              {" "}
              <span></span>
            </button>
            {/* se debe de agregar el componente para configurar el usuario */}
          </Link>
        </div>
      </div>
    </div>
  );
}

function Number2Decimals(x) {
  return Number.parseFloat(x).toFixed(2);
}

export default ProfileCard;
