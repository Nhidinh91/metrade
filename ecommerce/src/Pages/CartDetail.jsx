import CartItem from "../Components/CartItem";
import { useState, useEffect } from "react";
import Loading from "../Components/Loading";
import { Container, Row, Col } from "react-bootstrap";

const CartDetail = () => {
  const [cartItems, setCartItems] = useState(null);
  const [totalItem, setTotalItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartDetail = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/cart/get-cart-detail`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCartItems(data.cart_detail.cart_items);
        }
      } catch (error) {
        console.log("Error fetching product", error);
      }
    };
    fetchCartDetail();
  }, []);

  return (
    <Container className="cart-detail-page">
      <Row className="cart-header">
        <div className="go-back-button-container">
          <button
            type="button"
            className="go-back-button"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left"></i>Continue Shopping
          </button>
        </div>
        <h2 className="page-name">SHOPPING CART</h2>
      </Row>
      <Row className="cart-body">
        {!cartItems ? ( <Loading/> ) : (
          cartItems.map((item) => (
            <CartItem
              key={item._id}
              cartItemId={item._id}
              productId={item.product_id._id}
              productName={item.product_id.name}
              image={item.product_id.image}
              pickup_point={item.product_id.pickup_point}
              price={item.product_id.price}
              adding_quantity={item.adding_quantity}
              subTotal={item.sub_total}
            />
          ))
        )

        }
      </Row>
      <Row className="cart-footer">
        <div>
          <span>Order Total</span>
          <span>{`(${totalItem} ${totalItem >= 2 ? "items" : "item"})`}</span>
          <span>{totalPrice}</span>
        </div>
      </Row>
    </Container>
  );
};

export default CartDetail;
