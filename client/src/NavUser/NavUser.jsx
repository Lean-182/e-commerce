import { BiUser } from "react-icons/bi";
import { IconContext } from "react-icons";
import Style from "./NavUser.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/actions";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

function NavUser() {
  //login Google
  const { logout, user } = useAuth();
  const user2 = useSelector((state) => state.user_login);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(Logout());
    } catch (error) {
      console.error(error.message);
    }
  };

  // login email
  const dispatch = useDispatch();

  // function OnLogout() {

  // }
  console.log(user2);

  return (
    <div className={Style.navbar}>
      <div className={Style.dropdown}>
        <div className={Style.dropdown_content}>
          <a href="#" onClick={handleLogout}>Logout</a>
          <Link to={`/profile`}>Profile </Link>
          {user2 !== false && user2.typeUser != "Admin" && (
            <div>
              <Link to={`/OrdersUser`}>Your Orders </Link>
              <Link to={`/favorites`}>Your Favorites </Link>
            </div>
          )}
          {user2 !== false && user2.typeUser == "Admin" && (
            <div>
              <Link to={`/productsAdmin`}>Administracion Productos </Link>
              <Link to={`/usersAdmin`}>Administracion Usuarios </Link>
              <Link to={`/ordersAdmin`}>Administracion Ventas </Link>
              <Link to={`/createProduct`}>Create Product </Link>
            </div>
          )
          }
          {/*<a href="#">Link 2</a>
          <a href="#">Link 3</a>*/}
        </div>
        <button className={Style.dropbtn}>
          {user2.image == undefined ? (
            <IconContext.Provider value={{ color: "white", size: "25px" }}>
              <BiUser />
            </IconContext.Provider>
          ) : (
            <img src={user2.image} className={Style.avatar} />
          )}
        </button>
      </div>
    </div>
  );
}

export default NavUser;

//aca
