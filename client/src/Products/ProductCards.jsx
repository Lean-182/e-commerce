import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard.jsx";


class ProductCards extends Component {
  
  render() {
    let productos = this.props.paginated.productsViewPage
    console.log(productos)

    let fraseNoResultados = "No results found";
    return (
      <div className={this.props.styleCards.cards}>
        {productos.length !== 0 &&
          productos.map((c) => (
            <ProductCard
              key={c.id}
              id={c.id}
              img={c.image}
              name={c.name}
              brand={c.brand}
              price={c.price}
              styleCard={this.props.styleCard}
            />
          ))}
        {productos.length === 0 && (
          <div className="cards">
            <p>
              <b>{fraseNoResultados}</b>
            </p>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    paginated: state.paginated,
  };
}

export default connect(mapStateToProps)(ProductCards);
