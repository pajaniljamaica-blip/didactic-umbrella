import React from 'react';
import './card.css';

const StarRating = ({ rating, count }) => {
  return (
    <div className="card-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="star">
          {star <= Math.floor(rating) ? '★' : star - rating < 1 ? '½' : '☆'}
        </span>
      ))}
      <span className="count">({count})</span>
    </div>
  );
};

const Card = ({ item, onAddToCart }) => {
  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img src={item.image} alt={item.name} loading="lazy" />
        {item.badge && <span className="card-badge">{item.badge}</span>}
      </div>
      <div className="card-body">
        <h3 className="card-title">{item.name}</h3>
        <div className="card-meta">
          <span className="card-price">₱{item.price}</span>
          <StarRating rating={item.rating} count={item.reviews} />
        </div>
        <button className="card-add-btn" onClick={() => onAddToCart(item)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;