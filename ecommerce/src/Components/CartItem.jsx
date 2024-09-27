import { Row, Button, Col } from "react-bootstrap";
import coin from "../assets/star.png";
import "../Styles/CartItem.css";
import { useCallback, useState } from "react";

const CardItem = ({
  cartItemId,
  productId,
  productName,
  image,
  pickup_point,
  price,
  stock_quantity,
  adding_quantity,
  subTotal,
  updateQuantity,
  deleteItem
}) => {
  const handdleQuantityButton = (change) => {
    updateQuantity(change);
  };

  const handdleDeleteButton = () => {
    deleteItem();
  }
  return (
    <Row className="cart-item-container">
      <Col className="image-name-pickup">
        <div className="item-image">
          <img src={image} alt={productName} />
        </div>
        <div className="name-pickup">
          <div className="item-name">{productName}</div>
          <div
            className={`pick-up ${pickup_point}`}
          >{`Pick-up: ${pickup_point}`}</div>
          <div className="stock-number">{`Available in stock: ${stock_quantity}`}</div>
        </div>
      </Col>
      <Col className="price-and-quantity">
        <div className="item-price">
          <span>{price}</span>
          <img
            src={coin}
            alt="coin"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
        <div className="quantity-container">
          <div
            className="quantity-btn"
            onClick={() => handdleQuantityButton(-1)}
          >
            <i className="fa-solid fa-minus"></i>
          </div>
          <span className="quantity-number">{adding_quantity}</span>
          <div
            className="quantity-btn"
            onClick={() => handdleQuantityButton(+1)}
          >
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
        <div className="price-tag">
          <span>{subTotal}</span>
          <img
            src={coin}
            alt="coin"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
        <div className="delete-item-button" onClick={() => handdleDeleteButton()}>
          <i className="fa-regular fa-trash-can"></i>
        </div>
      </Col>
    </Row>
  );
};

export default CardItem;
