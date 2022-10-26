import React from "react";
import styles from "./CarryCard.module.css";
import { Link } from "react-router-dom";

function CarryCard({
  img,
  name,
  brand,
  price,
  id,
  size,
  amount,
  onDelete,
  onDecrease,
  onIncrease,
}) {


  return (
    <div className={styles.productContainer}>
      <div className={styles.photoContainer}>
        <img src={img} alt="No Found" />
      </div>
      <div className={styles.texContainer}>
        <p>{name}</p>
      </div>
        {/* <p>{brand}</p> */}{" "}
        {/* Me parece innecesario en este punto de la compra */}
        <div className={styles.priceCartContainer}>
          <p>{`Price: $${Number2Decimals(price)}`}</p>
          <p>Size: {size}</p>
        </div>
        <div className={styles.btnsContainer}>
          <div className={styles.btnPlusMinus}>
            <button onClick={onDecrease}>-</button>
            <span>{amount}</span>
            <button onClick={onIncrease}>+</button>
          </div>
          <div className={styles.btnDelete}>
            <button onClick={onDelete}>Delete</button>
          </div>
        </div>
    </div>
  );
}

function Number2Decimals(x) {
  return Number.parseFloat(x).toFixed(2);
}

export default CarryCard;
