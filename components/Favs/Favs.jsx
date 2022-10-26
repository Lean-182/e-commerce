import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import swal from "sweetalert";
import { getAllFavs } from "../../redux/actions";
import "./favs.css";

//LE LLEGA EL ID DEL FAVORITO
export default function Favs({ id }) {
  const favs = useSelector((state) => state.favs);
  const user_login = useSelector((state) => state.user_login);
  const history = useHistory();
  const dispatch = useDispatch();

  //TRAIGO LOS ESTADOS

  useEffect(() => {

    console.log(user_login)
    if (user_login.id) {
      dispatch(getAllFavs(user_login.id));
    }
  }, []);
  const [loading, setLoading] = useState(true);

  //VER SI EL PRODUCT ESTA EN LOS FAVS

  //BOTON AGREGAR FAV

  const handleClickAddFav = async () => {
    if (user_login.id !== undefined && user_login.id !== false) {
      await axios
        .post(`${process.env.REACT_APP_URL_BACK}/favorites`, {
          userId: user_login.id,
          productId: id,
        })
        .then(
          swal({
            title: "Success",
            icon: "success",
            button: "Ok",
          })
        )
        .then((res) => {
          if (res) {
            console.log("Entra ACAAAAAA")
            dispatch(getAllFavs(user_login.id));
          }
        })
        .catch((err) => console.log(err));
    } else {
      history.push("/login");
    }
  };

  //BOTON QUITAR FAV
  const handleClickRemoveFav = async () => {
    if (user_login.id !== undefined && user_login.id !== false) {
      await axios
        .delete(process.env.REACT_APP_URL_BACK + "/favorites", {
          data: {
            userId: user_login.id,
            productId: id,
          },
        })
        .then(
          swal({
            title: "Success",
            icon: "success",
            button: "Ok",
          })
        )
        .then((res) => {
          if (res) {
            console.log("Entra ACAAAAAA")
            dispatch(getAllFavs(user_login.id));
          }
        })
        .catch((err) => console.log(err));
    } else {
      history.push("/login");
    }
  };

  let comprobateFavs = [];

  for (let i = 0; i < favs.length; i++) {
    comprobateFavs.push(favs[i].id);
  }
  const isInFav = comprobateFavs.some((productId) => productId === id);


  if (user_login !== "Loading" && loading == true) {
    dispatch(getAllFavs(user_login.id));
    setLoading(false)
  }

  return (
    <>
      {loading == false ?
        <div>
          {!user_login.id || !isInFav ? (
            <button className="btnFavs btnDetailsBack" onClick={handleClickAddFav}>
              <span role="img" aria-label="Fav">
                {" "}
                Add To Favs{" "}
              </span>
            </button>
          ) : (
            <button className="btnFavs btnDetailsBack" onClick={handleClickRemoveFav}>
              <span role="img" aria-label="Fav">
                {" "}
                Remove From Favs{" "}
              </span>
            </button>
          )}
        </div>
        :
      <div>...</div>
      }
    </>
  );
}
