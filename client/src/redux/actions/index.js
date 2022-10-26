import axios from "axios";
require('dotenv').config();
const { REACT_APP_URL_BACK } = process.env;
import { USER_ID } from "../../components/Globales";
import Swal from "sweetalert2";

export const SEARCH_NAME = "SEARCH_NAME";
export const CHANGE_FILTER_GENDER = "CHANGE_FILTER_GENDER";
export const CHANGE_FILTER_CATEGORY = "CHANGE_FILTER_CATEGORY";
export const CHANGE_FILTER_BRAND = "CHANGE_FILTER_BRAND";
export const GET_CATEGORYS = "GET_CATEGORYS";
export const CHANGE_FILTER_MIN = "CHANGE_FILTER_MIN";
export const CHANGE_FILTER_MAX = "CHANGE_FILTER_MAX";
export const CHANGE_FILTER_PRICE = "CHANGE_FILTER_PRICE";
export const CHANGE_PAGINATED_PRODUCTS = "CHANGE_PAGINATED_PRODUCTS";
export const CHANGE_PAGINATED_PAGE = "CHANGE_PAGINATED_PAGE";
export const SEARCH_PRODUCT_ID = "SEARCH_PRODUCT_ID";
export const DELETE_DETAILS = "DELETE_DETAILS";
export const CHANGE_FILTER_NAME = "CHANGE_FILTER_NAME";
export const ADD_PRODUCT_CARRY = "ADD_PRODUCT_CARRY";
export const GET_STOCK_PRODUCT_BY_ID = "GET_STOCK_PRODUCT_BY_ID";
export const DELETE_STOCK_ID = "DELETE_STOCK_ID";
export const GET_STOCK_PRODUCT_BY_ID_TOTAL = "GET_STOCK_PRODUCT_BY_ID_TOTAL";
export const CHANGE_USER_LOGIN = "CHANGE_USER_LOGIN";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const CHANGE_PRODUCTS_CARRY = "CHANGE_PRODUCTS_CARRY";
export const GET_ORDERS = "GET_ORDERS";
export const CHANGE_PRODUCTS_BY_PAGE = "CHANGE_PRODUCTS_BY_PAGE";
export const CHANGE_FILTER_URL = "CHANGE_FILTER_URL";
export const DELETE_USERS = "DELETE_USERS";
export const CREATE_ORDER = "CREATE_ORDER";
export const GET_ALL_FAVS = "GET_ALL_FAVS";
export const DELETE_FAVS = "DELETE_FAVS";
export const PUT_USERS = "PUT_USERS";
export const GET_SEARCH_USER = "GET_SEARCH_USER";
export const SEARCH_ID = "SEARCH_ID";
export const PUT_STOCKS = "PUT_STOCKS";
export const IMAGE_POST = "IMAGE_POST"
export const CHANGE_IMAGES="CHANGE_IMAGES"



export function searchNameProduct(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        REACT_APP_URL_BACK + `/product/?name=${name}`
      );
      return dispatch({
        type: SEARCH_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchNameProductID(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        REACT_APP_URL_BACK + `/product/?id=${id}`
      );
      return dispatch({
        type: SEARCH_ID,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function changeFilternameProductSearched(name) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CHANGE_FILTER_NAME,
        payload: name,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchProductId(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(REACT_APP_URL_BACK + `/product/${id}`);
      return dispatch({
        type: SEARCH_PRODUCT_ID,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteDetails() {
  return {
    type: DELETE_DETAILS,
    payload: [],
  };
}

export function deleteStockbyID() {
  return {
    type: DELETE_STOCK_ID,
    payload: [],
  };
}

export function getCategorys() {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${REACT_APP_URL_BACK}/category`);
      //  console.log(`${REACT_APP_URL_BACK}/category`)
      //  console.log(json.data)
      return dispatch({
        type: GET_CATEGORYS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function changeFilterURL(url) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CHANGE_FILTER_URL,
        payload: url,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function changeFilterGender(gender) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CHANGE_FILTER_GENDER,
        payload: gender,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function changeFilterCategory(value) {
  return async function (dispatch) {
    try {
      console.log(value);;
      return dispatch({
        type: CHANGE_FILTER_CATEGORY,
        payload: value,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function changeFilterBrand(event) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CHANGE_FILTER_BRAND,
        payload: { filter: event.value, checked: event.checked },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function changeFilterMax(e) {
  return async function (dispatch) {
    try {
      let value = e.target.valueAsNumber;
      return dispatch({
        type: CHANGE_FILTER_MAX,
        payload: value,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function changeFilterMin(e) {
  return async function (dispatch) {
    let value = e.target.valueAsNumber;
    try {
      return dispatch({
        type: CHANGE_FILTER_MIN,
        payload: value,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function changeFilterPrice(checked) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CHANGE_FILTER_PRICE,
        payload: checked,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function changePaginatedProducts(nuevosProductos) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CHANGE_PAGINATED_PRODUCTS,
        payload: nuevosProductos,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function changePaginatedPage(newPage) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CHANGE_PAGINATED_PAGE,
        payload: newPage,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function changePaginatedByPage(productsByPage) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CHANGE_PRODUCTS_BY_PAGE,
        payload: productsByPage,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function ChangeCarryProducts(CarryNew) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CHANGE_PRODUCTS_CARRY,
        payload: CarryNew,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getStockbyID(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(REACT_APP_URL_BACK + `/stock/${id}`);
      return dispatch({
        type: GET_STOCK_PRODUCT_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getStockbyIDTotalFilterCarry(carry) {
  console.log("Entra", carry);
  return async function (dispatch) {
    try {
      let Stocks = [];
      for (let index = 0; index < carry.length; index++) {
        const element = carry[index];
        let json = await axios.get(
          REACT_APP_URL_BACK + `/stock/${element.id}`
        );
        let array = json.data;
        let elementoIndice = -1;
        console.log(array);
        for (let index = 0; index < array.length; index++) {
          const element2 = array[index];
          console.log(element2.productSize, "  ", element.state.size);
          if (element2.productSize === element.state.size) {
            elementoIndice = array[index];
            break;
          }
        }
        if (elementoIndice !== -1) Stocks.push(elementoIndice);
      }
      return dispatch({
        type: GET_STOCK_PRODUCT_BY_ID_TOTAL,
        payload: Stocks,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function DeleteDrop(payload) {
  return async function () {
    const response = await axios.put(REACT_APP_URL_BACK + "/stock/drop", {
      stockProducts: payload,
    });
    return response;
  };
}

/* CREAR PRODUCTO */

export function getChecklogin(newLoggedUser) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        REACT_APP_URL_BACK + `/users/login/?email=${newLoggedUser.email}&password=${newLoggedUser.password}`
      );

      var Dato = json.data;
      if (Dato === false) {
        Dato = { id: false };
        failedLogin();
      }

      return dispatch({
        type: CHANGE_USER_LOGIN,
        payload: Dato,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// login google

export function LoginGoogleUser(user) {
  console.log('USER', user)
  return async function (dispatch) {
    try {
      return dispatch({
        type: CHANGE_USER_LOGIN,
        payload: { user: user.userForToken, token: user.token }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

function failedLogin() {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "The email or password is not correct",
    showConfirmButton: false,
    timer: 1000,
  });
}

// Comments
export function createComment(payload) {
  console.log("este es el payload papi", payload);
  return function (dispatch) {
    axios
      .post(REACT_APP_URL_BACK + "/comment", payload)
      .then((res) => {
        dispatch({
          type: CREATE_COMMENT,
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function updateReview(payload) {
  //console.log("esto es el payload de revie",payload)

  return function (dispatch) {
    axios
      .put(REACT_APP_URL_BACK + `/comment`, payload)
      .then((res) => {
        console.log("todo tranqui");
        dispatch({
          type: "UPDATE_REVIEW",
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function getAllComments() {
  return function (dispatch) {
    console.log("gjogfjog");
    axios
      .get(REACT_APP_URL_BACK + "/comment")
      .then((res) => {
        dispatch({
          type: GET_COMMENTS,
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function getOrders(type, parameter) {
  console.log(type," ",parameter)
  return function (dispatch) {
    axios
      .get(
        REACT_APP_URL_BACK + `/orders?type=${type}&parameter=${parameter}`
      )
      .then((res) => {
        console.log("ENTRAAAAAAAAAAAAAAAAAAAAA")
        dispatch({
          type: GET_ORDERS,
          payload: res.data,
        });
      });
  };
}

export function createOrder(payload) {
  console.log(payload);
  return  async function (dispatch) {
    try{
    axios
      .post(`${REACT_APP_URL_BACK}/orders`, payload)
      .then((res) => {
        dispatch({
          type: CREATE_ORDER,
          payload: res,
        });
      })
    }
    catch(error) {
     console.log(error);}
  };
}

export function ActualiceOrder(type, id, data){
  return async function (dispatch) {
    try {
      console.log(type, id, data)
      let Datos = await axios({
        method: "put",
        url: `${REACT_APP_URL_BACK}/orders/${id}?type=${type}`,
        data: { data: data },
      })
      return Datos.data;
    } catch (error) {
      console.log("Cargando o los productos no son los indicados");
    }
  }
}

//USERS ADMIN

export function getAllUsers() {
  return function (dispatch) {
    axios
      .get(REACT_APP_URL_BACK + "/users")
      .then((res) => {
        dispatch({
          type: GET_ALL_USERS,
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));
  };
}
export function putUser(input, id) {
  return async function (dispatch) {
    try {
      console.log(input, id);

      const res = await axios.put(
        REACT_APP_URL_BACK + `/users/put/${id}`,
        input
      );
      return dispatch({
        type: PUT_USERS,
        payload: res.data,
      });
    } catch (error) {
      return(error);
    }
  };
}

export function putUserAddrees(input, id) {
  return async function (dispatch) {
    try {
      console.log(input, id);
      const res = await axios.put(
        REACT_APP_URL_BACK + `/users/putAddrees/${id}`,
        input
      );
      return dispatch({
        type: PUT_USERS,
        payload: res.data,
      });
    } catch (error) {
      return(error);
    }
  };
}

export function putUserType(type, userid,anotherParam) {
  return async function (dispatch) {
    try {
      console.log(type, userid,anotherParam);
      const res = await axios.put(
        REACT_APP_URL_BACK + `/users/${userid}/?type=${type}&anotherParam=${anotherParam}`);
      return res;
    } catch (error) {
      alert("Already exist or some trouble during creation! Come back later");
    }
  };
}

// export function getUserId(id) {
//   console.log(id)
//   return function (dispatch) {
//     axios
//       .get(REACT_APP_URL_BACK+`/users/${id}`)
//       .then((res) => {
//         dispatch({
//           type: CHANGE_USER_LOGIN,
//           payload: res.data,
//         });
//       })
//       .catch((error) => console.log(error));
//   };
// }

export function getSearchUser(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        REACT_APP_URL_BACK + `/users/?name=${name}`
      );
      return dispatch({
        type: GET_SEARCH_USER,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function deleteUsers() {
  return {
    type: DELETE_USERS,
    payload: [],
  };
}

//FAVS

export function getAllFavs(payload) {
  return function (dispatch) {
    axios
      .get(REACT_APP_URL_BACK + `/favorites/${payload}`)
      .then((res) => {
        dispatch({
          type: GET_ALL_FAVS,
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function deleteFavs() {
  return {
    type: DELETE_FAVS,
    payload: [],
  };
}

export function loginAction(payload) {
  return async function () {
    try {
      const resp = await axios.post(REACT_APP_URL_BACK + '/auth', payload)
      return resp.data

    } catch (error) {
      console.log(error)
    }
  }
}

export function Logout() {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CHANGE_USER_LOGIN,
        payload: { user: false, token: false },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function put_User_Login(newLoggedUser) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CHANGE_USER_LOGIN,
        payload: { user: newLoggedUser.userForToken, token: newLoggedUser.token }
      });
    } catch (error) {
      console.log(error);
    }
  };
}



export function ObtenerLogin() {
  let Data = JSON.parse(localStorage.getItem(USER_ID));
  console.log(Data)
  return async function (dispatch) {
    try {
      if (Data !== undefined && Data !== null) {
        var Datos = await axios.post(`${process.env.REACT_APP_URL_BACK}/auth/verify`, { authorization: `PalabraSecreta ${Data.token}` });
        console.log(Datos.data.userValidate)
        return dispatch(
          {
            type: CHANGE_USER_LOGIN,
            payload: { user: Datos.data.userValidate, token: Data.token }
          });
      }
      else {
        return dispatch(
          {
            type: CHANGE_USER_LOGIN,
            payload: { user: false, token: false }
          });
      }
    } catch (error) {
      return dispatch(
        {
          type: CHANGE_USER_LOGIN,
          payload: { user: false, token: false }
        });
    }
  };
}

export function CreateNewProduct(payload) {
  const { name, price, brand, gender, nameCategory, description, imageData } = payload
  return async function (dispatch) {
    try {
      let clouData = await axios.post(`${process.env.REACT_APP_URL_BACK}/cloudinary/upload`, { file: imageData, folder: "Products", name })
      console.log(clouData)
      const response = await axios.post(REACT_APP_URL_BACK + "/product/", { name, price, brand, gender, nameCategory, description, image: clouData.data.url });
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
}


export async function CrearImagenCloudinary(imageData,name) {
  console.log("Entra")
    try {
      let clouData = await axios.post(`${process.env.REACT_APP_URL_BACK}/cloudinary/upload`, { file: imageData, folder: "Products", name })
      console.log(clouData);
      return clouData;
    } catch (e) {
      console.log(e);
    }
}





export async function register (payload) {
  const resp = await axios.post(REACT_APP_URL_BACK + '/auth/register', payload)
  console.log(resp)
  return resp.data
}

export async function createOrder2(payload) {
  try{
  axios
    .post(`${REACT_APP_URL_BACK}/orders`, payload)
    .then((res) => {
      return res;
    })
  }
  catch(error) {
   console.log(error);}
}

export function forgotPassword(payload) {

  console.log(payload);
  return async function () {
    try {
      const resp = await axios.post(`${REACT_APP_URL_BACK}/auth/forgot` , payload)
      console.log(resp.data)
      return resp.data

    } catch (error) {
      console.log(error)
    }
  }
}

export function resetPassword(password,token) {
  console.log(password,token)
  return async function () {
    try {
      const resp = await axios.put(`${REACT_APP_URL_BACK}/auth/reset`, {password,token})
      console.log(resp.data)
      return resp.data

    } catch (error) {
      console.log(error)
    }
  }
}



export function ObtenerImagenes(folder) {
  return async function (dispatch) {
    try {
        var Images = await axios.get(`${process.env.REACT_APP_URL_BACK}/cloudinary/images/?folder=${folder}`);
        return dispatch(
          {
            type: CHANGE_IMAGES,
            payload: Images.data
          });
    } catch (error) {
      console.log(error)
    }
  };
}
