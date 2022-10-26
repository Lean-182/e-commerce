import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrders } from "../../redux/actions";
import { Link } from "react-router-dom";
import Orders2Cards from "./Orders2Cards.jsx";
import styles from "./Orders2.module.css";
//import { withRouter } from "react-router-dom";

import DataTable, { createTheme } from 'react-data-table-component';
import { withRouter } from "react-router";

class Orders2 extends Component {
  componentDidMount() {
    console.log(this.props.user)
    this.props.getOrders("UserID", this.props.user.id);
  }

  state = {
    Loading: false,
  }


  handleButtonClick(Link) {
    console.log(Link)
  this.props.history.push(Link)
  }


  render() {
   console.log(this.props)

    if (this.props.user != "Loading" && this.state.Loading == false) {
      this.props.getOrders("UserID", this.props.user.id);
      this.setState({
        Loading: true,
      })
    }

    const { orders } = this.props;

    const columnas = [
      {
        cell: (e) => <button className={styles.ButtonOrdersUsers}
        onClick={(row)=>this.handleButtonClick(`/OrderDetails/${e.id}`)}>Details</button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
      {
        name: "ID",
        selector: (row) => row.id,
        sortable: true,
        style:{
          fontWeight: "bold"
        }
      },
      {
        name: "CREATE",
        selector: (row) => ((row.createdAt)),
        sortable: true,
        style:{
          fontWeight: "bold"
        }
      },
      {
        name: "IDPAYPAL",
        selector: (row) => row.idPaypal,
        sortable: true,
        style:{
          fontWeight: "bold"
        }
      },
      {
        name: "PRICE $",
        selector: (row) => row.price,
        sortable: true,
        style:{
          fontWeight: "bold"
        }
      },
      {
        name: "STATE ORDER",
        selector: (row) => row.stateOrder,
        sortable: true,
        style:{
          fontWeight: "bold"
        }
      },
    ];


    const customStyles = {
      rows: {
        style: {
          minHeight: '40px', // override the row height
        },
      },
      headCells: {
        style: {
          paddingLeft: '8px', // override the cell padding for head cells
          paddingRight: '8px',
         color: '#000000',
         fontWeight: "bold",
         background: "#FFC7FF",
         color:"#CB1CFF"
        },
      },
      cells: {
        style: {
          paddingLeft: '8px', // override the cell padding for data cells
          paddingRight: '8px',
        },
      },
    };

    createTheme('solarized', {
      text: {
        primary: '#000000 ',
        secondary: '#7800FF',
      },
      background: {
        default: '#D5C7FF',
      },
      context: {
        background: '#cb4b16',
        color: '#ff01c6;',
      },
      divider: {
        default: '#073642',
      },
      action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
      },
    }, 'dark');


    function taskDate(dateMilli) {
      var Dia = (dateMilli).split(",");
      var Horario = Dia[0].split("/");
      var Horario2 = [Horario[2], Horario[1], Horario[0]].join('/');
      Horario2 = [Horario2, Dia[1]].join(',');
      return Horario2;
    }

    var Ordernes2 = orders.map((c) => {
      let Date_ = new Date(c.createdAt)
      var Horario = taskDate(Date_.toLocaleString())
      return ({
        ...c,
        createdAt: Horario,
        price: (c.price).toFixed(2)
      })
    })

    return (
      <div className={styles.cards}>
        {orders.length !== 0 ? (
          <DataTable
            columns={columnas}
            data={Ordernes2}
            title="Purchase order status"
            pagination={true}
            theme="solarized"
            customStyles={customStyles}
          />
        ) : (
          /*  (
          orders.map((c) => (
            <Orders2Cards
              key={c.id}
              id={c.id}
              create={c.createdAt}
              idPaypal={c.idpurchase}
              price={c.price}
              stateOrder={c.stateOrder}
              stocks={c.stocks}
            />
          ))
        )  */
          <div className="cards">
            <h3 className={""}>
              You haven't made any purchases yet. Once you purchase an item, it
              will show up here.
            </h3>
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    orders: state.orders,
    user: state.user_login,
  };
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getcountries
  return {
    getOrders: (type, parameter) => dispatch(getOrders(type, parameter)),
    //changePaginatedPage: (page) => dispatch(changePaginatedPage(page)),
  };
}

const Orders2WithRouter = withRouter(Orders2);

export default connect(mapStateToProps, mapDispatchToProps)(Orders2WithRouter);
