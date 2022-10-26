import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./details.css";
import swal from "sweetalert2";
import FeedBack from "../Orders/FeedBack";
import Favs from "../Favs/Favs";

import {
  deleteDetails,
  searchProductId,
  ChangeCarryProducts,
  getStockbyID,
  deleteStockbyID,
  // LoginGoogleUser
} from "../../redux/actions/index";

export default function Details(props) {
  console.log(props)

  const dispatch = useDispatch();
  const detail = useSelector((state) => state.details);
  const genderPrevius = useSelector((state) => state.filters.filterGender);
  const carryProducts = useSelector((state) => state.carryProducts);
  const stock_by_ID = useSelector((state) => state.stock_by_ID);
  const user = useSelector((state) => state.user_login);
  const product = useSelector((state) => state.products);
  console.log(user, "soy user detalle");

  const [stateSize, SetstateSize] = useState({
    size: undefined,
    stock: undefined,
  });
  const [stateQuanty, SetstateQuanty] = useState(1);
  //const [statecarryProducts, SetstatecarryProducts] = useState(undefined);

  useEffect(() => {
    dispatch(getStockbyID(props.match.params.id));
    dispatch(searchProductId(props.match.params.id));
    return () => {
      // dispatch(deleteDetails());
      dispatch(deleteStockbyID());
      SetstateSize(undefined);
    };
  }, []);

  function Number2Decimals(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  function AddOrModifyCarry(carryAdd, carryProducts) {
    let array = Object.assign([], carryProducts);
    let alertNo = false;
    let indice = carryProducts.findIndex(
      (carry) =>
        carry.id === carryAdd.id &&
        JSON.stringify(carry.state.size) === JSON.stringify(carryAdd.state.size)
    );
    if (indice == -1) {
      array.push(carryAdd);
    } else {
      let cantidad = array[indice].amount + carryAdd.amount;
      if (cantidad > carryAdd.state.stock) {
        alertNo = true;
        cantidad = carryAdd.state.stock;
        swal.fire({
          title: `the maximum number of stock of this product(${carryAdd.details.name}) has been addedProduct Added`,
          position: "bottom-start",
          icon: "info",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      array[indice].amount = cantidad;
    }
    if (!alertNo) {
      swal.fire({
        title: `Product Added ${carryAdd.details.name} to shopping cart!`,
        position: "bottom-start",
        icon: "success",
        showConfirmButton: false,
        timer: 400,
      });
    }
    return array;
  }

  function handleAddCarry() {
    let id = props.match.params.id;
    let elemento = {
      state: stateSize,
      id: id,
      amount: stateQuanty,
      details: detail[0],
    };
    let NewCarry = AddOrModifyCarry(elemento, carryProducts);
    dispatch(ChangeCarryProducts(NewCarry));
    SetstateQuanty(1);
  }

  function changeQuanty(e) {
    SetstateQuanty(e.target.valueAsNumber);
  }
  function changeSize(e, indice, stock) {
    //if(stock>0)
    SetstateSize({
      size: stock_by_ID[indice].productSize,
      stock: stock_by_ID[indice].stock,
    });
  }

  if (stateSize === undefined)
    SetstateSize({ size: undefined, stock: undefined });

  let producto = product.map((producto) => {
    if (detail.airlineId === producto.id) {
      return producto.name;
    }
  });


  return (
    <div className="cardDetailMainContainer">
      {detail.length > 0 ? (
        // Se agrego un ternario y se movió la imagen para poder acomodar el CSS con la propiedad Flex
        <div className="imageContainer">
          <img src={detail[0].image} alt="Not Found" />
        </div>
      ) : null}
      <div className="cardDetail">
        {detail.length > 0 ? (
          <div>
            <div className="infoContainer">
              <p>Genre: {detail[0].gender} </p>
              <p>Category: {detail[0].category.name}</p>
              <p>Brand: {detail[0].brand} </p>
              <p>Price: {`$${Number2Decimals(detail[0].price)}`} </p>
            </div>
            {/*TARJETA DE DETALLES*/}

            <div className="detailsContainer">
              {/*----------------------------*/}
              {/*TEXTO CHOOSE SIZE*/}

              {/*MUESTREO DE SIZE (TALLAS)*/}
              {stock_by_ID.length > 0 && stateSize !== undefined ? (
                <div className="mainDetails">
                  <div className="containerFormAddCarry">
                    {(stateSize === undefined ||
                      stateSize.size === undefined) && (
                        <label className="textChooseSize">Choose Size</label>
                      )}
                    <div className="paragraphSizes">
                      Available sizes:
                      <br />
                      {stock_by_ID.map((sizeStock, index) => {
                        return (
                          <div className="selectSize">
                            <label
                              id={
                                sizeStock.productSize === stateSize.size
                                  ? "SizeSeleccionada"
                                  : "SizeNoSeleccionada"
                              }
                              className={
                                sizeStock.stock === 0
                                  ? "SizeSoldOut"
                                  : "SizeOnSale"
                              }
                              onClick={(e) =>
                                changeSize(e, index, sizeStock.stock)
                              }
                            >
                              {sizeStock.productSize}{" "}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    {/*----------------------------*/}

                    {/*MUESTREO DE CANTIDAD PRECIO Y BOTON COMPRA*/}
                    {stateSize.stock > 0 ? (
                      <div>
                        <p className="paragraphQuantity">
                          Quantity:
                          {
                            <input
                              className="quantInput"
                              type="number"
                              placeholder="Amount"
                              min={1}
                              max={stateSize.stock}
                              value={stateQuanty}
                              onChange={(e) => changeQuanty(e)}
                            />
                          }
                          <span>(Stock:{stateSize.stock})</span>
                        </p>
                        <p className="ParagraphTotalPrice">
                          Total price:
                          {`  $${Number2Decimals(
                            detail[0].price * stateQuanty
                          )}`}
                        </p>
                        <button
                          className="btnAddCarry"
                          onClick={() => handleAddCarry()}
                        >
                          Add Carry
                        </button>
                      </div>
                    ) : stateSize.size === undefined ? (
                      " "
                    ) : (
                      <p className="soldOut">SOLD OUT</p>
                    )}
                    {/*---------------------------------*/}
                  </div>
                </div>
              ) : (
                <div>Loading Stock</div>
              )}
            </div>
          </div>
        ) : (
          <p>LOADING...</p>
        )}
      </div>
      {user !== "Loading" && user !== false &&
        <div className="btnBackFav">
          <Favs id={props.match.params.id} key="id" />
        </div>}
      <div>
        <FeedBack productId={props.match.params.id} products={producto} />
      </div>
      <div>
        <Link to={`/products/${genderPrevius}`}>
          <button className="btnDetailsBack">Go Back</button>
        </Link>
      </div>
      </div>)
  }
