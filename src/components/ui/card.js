import React from "react";
import "./card.css";

const Card = ({ image, title, price, rating }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-img" />

      <div className="card-body">
        <h3>{title}</h3>
        <p className="price">₱{price}</p>

        <div className="rating">
          ⭐ {rating}
        </div>

        <button className="btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;