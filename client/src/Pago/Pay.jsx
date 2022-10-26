import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./Pay.css";
import {
  DeleteDrop,
  ChangeCarryProducts,
  createOrder,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Pay(props) {
  const dispatch = useDispatch();
  const carryProducts = useSelector((state) => state.carryProducts);
  const history = useHistory();
  const user = useSelector((state) => state.user_login);
  let [arrProduc, setArrProduc] = useState([]);
  let [arrPrecio, setArrPrecio] = useState(0);

  console.log(props);

  useEffect(() => {
    let articulos = carryProducts.map((e) => {
      return {
        name: e.details.name,
        description: e.details.name + "-" + e.details.id,
        unit_amount: {
          currency_code: "USD",
          value: e.details.price + "", //aca
        },
        quantity: e.amount,
      };
    });
    setArrProduc(articulos);
    let PrecioTotalArticulos =
      articulos[0].unit_amount.value * articulos[0].quantity;

    let multiplicacionEntreValueYQuantity = articulos.map((e) => {
      return e.unit_amount.value * e.quantity;
    });

    if (articulos.length > 1) {
      PrecioTotalArticulos = multiplicacionEntreValueYQuantity.reduce(
        (prev, current) => {
          return prev + current;
        }
      );
    }
    setArrPrecio(PrecioTotalArticulos);
  }, []);

  const createOrderPaypal = (data, actions) => {
    console.log("Entra aca");
    return actions.order
      .create({
        purchase_units: [
          {
            reference_id: "PUHF",
            description: "Sporting Goods",
            custom_id: "CUST-HighFashions",
            soft_descriptor: "HighFashions",
            amount: {
              currency_code: "USD",
              value: arrPrecio.toFixed(2),
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderId) => {
        return orderId;
      })
      .catch((error) => console.log(error));
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (detalles) {

      const sendOrderPP = {
        stocks: carryProducts.map((e) => {
          return {
            amount: e.amount,
            value: e.details.price,
            productId: e.id,
            image: e.details.image,
            size: e.state.size,
            name: e.details.name,
          };
        }),
        userId: user.id,
        estado: 'Paid',
        contactAdress: { contact: props.contact, myAdress: props.myAdress }
      };
      dispatch(createOrder(sendOrderPP));

      let arregloObjetosIdQuantity = carryProducts.map((e) => {
        return { size: e.state.size, stock: e.amount, id: e.id };
      });

      let stockProducts = { stockProducts: arregloObjetosIdQuantity };

      function CambioPagina() {
        dispatch(ChangeCarryProducts([]))
       /* Swal.fire({
          title: "Se creo la orden con exito",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Yes",
          denyButtonText: `No`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
         /* if (result.isConfirmed) {*/
            props.ClickContinue()
      }

        await axios({
          method: "put",
          url: `${process.env.REACT_APP_URL_BACK}/stock/drop`,
          data: stockProducts,
        })
          .then((e) => e.data, CambioPagina())
          .catch((e) => console.log(e), CambioPagina());
      })
      .catch((error) => console.log(error));
  };

  //   {id: '6DX94897RC997852V', intent: 'CAPTURE', status: 'COMPLETED', purchase_units: Array(1), payer: {…}, …}
  //   create_time: "2022-06-29T17:22:02Z"
  //   id: "6DX94897RC997852V"
  //   intent: "CAPTURE"
  //   links: [{…}]
  //   payer: {name: {…}, email_address: 'sb-471yzp17341676@personal.example.com', payer_id: '39FW54JMV78TL', address: {…}}
  //   purchase_units: [{…}]
  //   status: "COMPLETED"
  //   update_time: "2022-06-29T17:22:20Z"

  function onCancel() {
    console.log("cancel");
    Swal.fire({
      icon: "error",
      title: "Payment Cancelled",
      text: "Your payment has been cancelled and will not be charged",
    });
  };

  function onError(error) {
    Swal.fire({
      icon: "error",
      title: "Payment Error",
      text: "There has been an error in your payment and will not be charged",
    });
    console.log("Error: ", error);
  };

  return (
    <div className="paypalContainer" >
      {/*<div className="">
        <h1 className={styles.title}>CIOCLOTHES</h1>
  </div>

      <br />
      <br />
      */}
      <PayPalScriptProvider deferLoading={false}>
        <PayPalButtons
          createOrder={(data, actions) => createOrderPaypal(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
          onCancel={() => onCancel()}
          onError={(error) => onError(error)}
        />
      </PayPalScriptProvider>
    </div>
  );
}
