import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
import Button from "../SmallComponents/Button/Button";
import Rating from "../SmallComponents/Rating";
import QuantitySelector from "../SmallComponents/QuantitySelector";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img src={image} alt={name} className="food-item-image" />
        <div className="quantity-selector-overlay">
          <QuantitySelector />
        </div>
      </div>
      
      <div className="food-item-content">
        <div className="food-item-header">
          <h3 className="food-item-title">{name}</h3>
          <span className="food-item-price">${price}</span>
        </div>
        
        <div className="food-item-rating">
          <Rating rating={4} />
        </div>
        
        <p className="food-item-description">{description}</p>
        
        <Link to={`/food/${id}`} className="more-details-link">
          <Button>More details</Button>
        </Link>
      </div>
    </div>
  );
};

export default FoodItem;