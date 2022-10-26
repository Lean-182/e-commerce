import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrders } from "../../redux/actions";
import { Link } from "react-router-dom";
import styles from "./OrdersDetails.module.css";
import { withRouter } from "react-router-dom";
import TextField from "@mui/material/TextField";
//import { withRouter } from "react-router-dom";

class OrdersDetails extends Component {
  componentDidMount() {
    this.props.getOrders("OrderID", this.props.match.params.id);
  }

  render() {
    console.log(this.props);
    console.log(this.props.orders);
    const { orders } = this.props;
    console.log(orders);
    const Stocks = orders[0] != undefined ? JSON.parse(orders[0].stocks) : [];
    console.log(Stocks);
    return (
      <div className={styles.container}>
        {orders !== undefined && orders.length !== 0 ? (
          <div className={styles.cards}>
            <div className={styles.headerOrder}>
              <p>Cod ID: {orders[0].id}</p>
              <p>User ID: {orders[0].userId}</p>
              <p>Creation Date: {(new Date (orders[0].createdAt)).toLocaleString()}</p>
              <p>ID Paypal: {orders[0].idpurchase}</p>
              <p>State Order: {orders[0].stateOrder}</p>
            </div>
            <div className={styles.flexContainer}>
              {Stocks != undefined &&
                Stocks.map((c, index) => (
                  <div className={styles.cardContainer}>
                    <div className={styles.imgContainer}>
                      <Link to={`/details/${c.productId}`}>
                        <img src={`${c.image}`} alt="No found"></img>
                      </Link>
                    </div>
                    <div className={styles.dataContainer}>
                      <p>Amount:{c.amount}</p>
                      <p>Value: {c.value}</p>
                      <p>Total: {(c.amount * c.value).toFixed(2)} </p>
                    </div>
                  </div>
                ))}
            </div>

            <p className={styles.paragraphTotal}>
              Price Total: {orders[0].price}
            </p>
          </div>
        ) : (
          <div className="cards">
            <p>
              <h3 className={""}>No Order.</h3>
            </p>
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    orders: state.orders,
  };
}
const OrderDetailWithRouter = withRouter(OrdersDetails);

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getcountries
  return {
    getOrders: (user, id) => dispatch(getOrders(user, id)),
    //changePaginatedPage: (page) => dispatch(changePaginatedPage(page)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailWithRouter);
