import {
  SEARCH_NAME,
  CHANGE_FILTER_GENDER,
  CHANGE_FILTER_CATEGORY,
  CHANGE_FILTER_BRAND,
  GET_CATEGORYS,
  CHANGE_FILTER_MAX,
  CHANGE_FILTER_MIN,
  CHANGE_FILTER_PRICE,
  CHANGE_PAGINATED_PRODUCTS,
  CHANGE_PAGINATED_PAGE,
  SEARCH_PRODUCT_ID,
  DELETE_DETAILS,
  CHANGE_FILTER_NAME,
  GET_STOCK_PRODUCT_BY_ID,
  DELETE_STOCK_ID,
  GET_STOCK_PRODUCT_BY_ID_TOTAL,
  CHANGE_PRODUCTS_CARRY,
  CHANGE_USER_LOGIN,
  GET_ORDERS,
  GET_ALL_USERS,
  CHANGE_PRODUCTS_BY_PAGE,
  CHANGE_FILTER_URL,
  DELETE_USERS,
  GET_COMMENTS,
  CREATE_ORDER,
  GET_ALL_FAVS,
  DELETE_FAVS,
  GET_SEARCH_USER,
  SEARCH_ID,
  IMAGE_POST,
  CHANGE_IMAGES
} from "../actions";


import { CARRY_LOCALHOST, USER_ID } from "../../components/Globales";
import { act } from "@testing-library/react";
import axios from "axios";

const PAGE_START = 1;

const initialState = {
  products: [],
  productsId: [],
  details: [],
  categorys: [],
  filters: {
    nameProductSearched: "",
    filterGender: "Men",
    filterBrand: [],
    filterCategory: 0,
    min: 0,
    max: 500,
    filterForPrice: false,
    filterUrl: undefined,
  },
  paginated: { page: PAGE_START, productsView: [], productsViewPage: [] },
  stock_by_ID: [],
  carryProductsStocks: [],
  carryProducts: ObtenerInicialProductsCarry(),
  user_login: "Loading",
  allUsers: [],
  orders: [],
  comments: [],
  favs: [],
  imagesCloudinary:[],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "value":
      break;
    case SEARCH_NAME:
      return {
        ...state,
        products: action.payload,
      };
    case SEARCH_ID:
      return {
        ...state,
        productsId: action.payload,
      };
    case SEARCH_PRODUCT_ID:
      return {
        ...state,
        details: action.payload,
      };
    case DELETE_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case DELETE_STOCK_ID:
      return {
        ...state,
        stock_by_ID: action.payload,
      };
    case GET_CATEGORYS:
      return {
        ...state,
        categorys: action.payload,
      };
    case CHANGE_FILTER_URL:
      return {
        ...state,
        filters: {
          ...state.filters,
          filterGender: "Men",
          filterBrand: [],
          filterCategory: 0,
          filterUrl: action.payload,
        },
        paginated: { ...state.paginated, page: PAGE_START },
      };
    case CHANGE_FILTER_GENDER:
      return {
        ...state,
        filters: {
          ...state.filters,
          filterGender: action.payload,
          filterBrand: [],
          filterCategory: 0,
        },
        paginated: { ...state.paginated, page: PAGE_START },
      };
    case CHANGE_FILTER_CATEGORY:
      return {
        ...state,
        filters: {
          ...state.filters,
          filterCategory: action.payload,
          filterBrand: [],
        },
        paginated: { ...state.paginated, page: PAGE_START },
      };
    case CHANGE_FILTER_BRAND:
      return {
        ...state,
        filters: {
          ...state.filters,
          filterBrand: AgregarDesagregarArray(
            state.filters.filterBrand,
            action
          ),
        },
        paginated: { ...state.paginated, page: PAGE_START },
      };
    case CHANGE_FILTER_MIN:
      if (action.payload < state.filters.max) {
        return {
          ...state,
          filters: { ...state.filters, min: action.payload },
          paginated: { ...state.paginated, page: PAGE_START },
        };
      }
      return state;
    case CHANGE_FILTER_MAX:
      if (action.payload > state.filters.min) {
        return {
          ...state,
          filters: { ...state.filters, max: action.payload },
          paginated: { ...state.paginated, page: PAGE_START },
        };
      }
      return state;
    case CHANGE_FILTER_PRICE:
      return {
        ...state,
        filters: { ...state.filters, filterForPrice: action.payload },
        paginated: { ...state.paginated, page: PAGE_START },
      };
    case CHANGE_PAGINATED_PRODUCTS:
      return {
        ...state,
        paginated: {
          ...state.paginated,
          productsView: action.payload,
          page: PAGE_START,
        },
      };
    case CHANGE_PAGINATED_PAGE:
      return {
        ...state,
        paginated: { ...state.paginated, page: action.payload },
      };
    case CHANGE_PRODUCTS_BY_PAGE:
      return {
        ...state,
        paginated: { ...state.paginated, productsViewPage: action.payload },
      };
    case CHANGE_FILTER_NAME:
      return {
        ...state,
        filters: {
          ...state.filters,
          nameProductSearched: action.payload,
          filterBrand: [],
        },
        paginated: { ...state.paginated, page: PAGE_START },
      };
    case CHANGE_PRODUCTS_CARRY:
      localStorage.setItem(CARRY_LOCALHOST, JSON.stringify(action.payload));
      return {
        ...state,
        carryProducts: action.payload,
      };
    case GET_STOCK_PRODUCT_BY_ID:
      return {
        ...state,
        stock_by_ID: action.payload,
      };
    case GET_STOCK_PRODUCT_BY_ID_TOTAL:
      return {
        ...state,
        carryProductsStocks: action.payload,
      };
    case CHANGE_PRODUCTS_CARRY:
      console.log("Cambio aca ", action.payload);
      return {
        ...state,
        carryProducts: action.payload,
      };
    case CHANGE_USER_LOGIN:
      console.log("Entra aca en Login")
      console.log(action.payload.token,"  ",action.payload.user)
      Cambiar_ID_Login(action.payload.token);
      return {
        ...state,
        user_login: action.payload.user,
      };
    case GET_ORDERS: {
      console.log(action.payload)
      return {
        ...state,
        orders: action.payload,
      };
    }
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case GET_SEARCH_USER:
      return {
        ...state,
        allUsers: action.payload,
      };
    case GET_COMMENTS: {
      return {
        ...state,
        comments: action.payload,
      };
    }
    case DELETE_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case CREATE_ORDER:
      return {
        ...state,
        orders: action.payload,
      };
    case GET_ALL_FAVS:
      return {
        ...state,
        favs: action.payload,
      };
    case DELETE_FAVS:
      return {
        ...state,
        favs: action.payload,
      };
    case IMAGE_POST:
      return{
        ...state,
      }
    case CHANGE_IMAGES:
      return {
        ...state,
        imagesCloudinary: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;

function AgregarDesagregarArray(elementos, action) {
  let element = elementos;
  if (action.payload.checked) {
    if (!element.includes(action.payload.filter))
      element.push(action.payload.filter);
  } else {
    if (element.includes(action.payload.filter))
      element = element.filter((e) => e !== action.payload.filter);
  }
  return element;
}

function ObtenerInicialProductsCarry() {
  let Data = JSON.parse(localStorage.getItem(CARRY_LOCALHOST));
  var Array = [];
  if (Data !== undefined && Data !== null && Data.length !== 0) {
    Array = Data;
  }
  return Array;
}


function Cambiar_ID_Login(Dato) {
  localStorage.setItem(USER_ID, JSON.stringify({ token: Dato }));
}
