import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFavs, deleteFavs } from "../../redux/actions";
import FavoritesCards from "./FavoritesCards";
import heart from "../../assets/brokenHeart.png"
import Login from "../Login/Login";
import { style as s } from "@mui/system";
import "./favs.css";

export default function Favorites() {
  //SETEO ESTADOS DEL REDUCER
  const favorites = useSelector((state) => state.favs);
  const user_login = useSelector((state) => state.user_login);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  //ME ASEGURO DE CARGAR LOS ESTADOS
  useEffect(() => {
    console.log(user_login);
    if (user_login.id) {
      dispatch(getAllFavs(user_login.id));
      dispatch(deleteFavs());
    }
  }, [dispatch]);

  if (user_login !== "Loading" && loading == true) {
    dispatch(getAllFavs(user_login.id));
    setLoading(false);
  }

  return (
    <>
      {user_login.id && user_login !== "Loading" ? (
        <div className="favsContainer">
          <div className="titleCreate titleFavs">
            <h1>FAVORITES</h1>
          </div>
          <div className="favsCards">
            {favorites.length > 0 && favorites ? (
              favorites.map((f) => {
                return (
                  <FavoritesCards
                    user_login={user_login}
                    key={f.id}
                    id={f.id}
                    image={f.image}
                    name={f.name}
                  />
                );
              })
            ) : (
              <div className="heartContainer">
              <img alt="favs" className="emptyHeart" src={heart} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>LOADING</p>
      )}
    </>
  );
}
