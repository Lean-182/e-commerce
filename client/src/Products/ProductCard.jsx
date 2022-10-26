import React from "react";
import { Link } from "react-router-dom";
import "./productCard.css";

function ProductCard({ img, name, brand, price, id, /*styleCard*/ }) {
	
	return (
		<div className="card" 	>
			<Link to={`/details/${id}`} className="linkCard">
				<div key={id}>
					<div className="containerImgCard">
						<img src={img} alt="No Found" className="imgCard" />
					</div>
				</div>
			</Link>
			<div className="card__content">
				<h3>{name}</h3>
				<p className="cardContent2">{brand}</p>
				<div className="cardContent2">{`$${Number2Decimals(price)}`}</div>
			</div>
		</div>
	);
}

function Number2Decimals(x) {
	return Number.parseFloat(x).toFixed(2);
}

export default ProductCard;
