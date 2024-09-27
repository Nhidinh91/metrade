import CartItem from "../Components/CartItem";
import { useState, useEffect, useCallback } from "react";
import Loading from "../Components/Loading";
import { Container, Row } from "react-bootstrap";
import "../Styles/CartDetail.css";
import coin from "../assets/star.png";

const CartDetail = () => {
  const [cartItems, setCartItems] = useState([]);
  const [updatedCartItem, setUpdatedCartItem] = useState(null);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalOrderItems, setTotalOrderItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total items in the cart
  const calculateTotalCartItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.adding_quantity, 0);
  }, [cartItems]);

  // Calculate total items in the order
  const calculateTotalOrderItems = (itemsToCheckout) => {
    return itemsToCheckout.reduce(
      (total, item) => total + item.adding_quantity,
      0
    );
  };

  // Calculate total price of the order
  const calculateTotalOrderPrice = (itemsToCheckout) => {
    return itemsToCheckout.reduce((total, item) => total + item.sub_total, 0);
  };

  // Function to fetch the detail information of the cart
  const fetchCartDetail = useCallback(async () => {
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
        setCartItems(data.cart_detail.cart_items || []);
      }
    } catch (error) {
      console.log("Error fetching product", error);
    }
  }, []);

  // Recalculate total cart items whenever cartItems change
  useEffect(() => {
    if (cartItems.length > 0) {
      setTotalCartItems(calculateTotalCartItems());
    }
  }, [cartItems, calculateTotalCartItems]);

  // Call fetchCartDetail on component mount or when the cart is updated
  useEffect(() => {
    fetchCartDetail();
  }, [updatedCartItem, fetchCartDetail]);

  // Function to update quantity of each cart item
  const fetchUpdateQuantity = async (cartItemId, quantity) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cart/update-quantity`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart_item: {
              id: cartItemId,
              quantity: quantity,
            },
          }),
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const newCartItem = data.cart_item;
        setUpdatedCartItem(newCartItem);
      }
    } catch (error) {
      console.log("Error updating cart item", error);
    }
  };

  const handleUpdateQuantity = useCallback((cartItemId, quantity) => {
    fetchUpdateQuantity(cartItemId, quantity);
  }, []);

  // Function to delete a cart item
  const deleteItem = async (cartItemId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cart/delete-cart-item/${cartItemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUpdatedCartItem(data.deleted_item);
      }
    } catch (error) {
      console.log("Error deleting cart item", error);
    }
  };

  const handleDeleteItem = useCallback((cartItemId) => {
    deleteItem(cartItemId);
  }, []);

  // Handle checkbox selection for checkout
  const handleSelectChange = useCallback((cartItemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(cartItemId)) {
        return prevSelectedItems.filter((id) => id !== cartItemId);
      } else {
        return [...prevSelectedItems, cartItemId];
      }
    });
  }, []);

  // Recalculate total checked items whenever selectedItems change
  useEffect(() => {
    const itemsToCheckout = cartItems.filter((item) =>
      selectedItems.includes(item._id)
    );

    if (itemsToCheckout.length > 0) {
      setTotalOrderItems(calculateTotalOrderItems(itemsToCheckout));
      setTotalPrice(calculateTotalOrderPrice(itemsToCheckout));
    } else {
      setTotalOrderItems(0);
      setTotalPrice(0);
    }
  }, [cartItems, selectedItems]);

  // Handle checkout
  const handleCheckout = () => {
    

    console.log("Proceeding to checkout with items:", itemsToCheckout);
  };

  return cartItems.length === 0 ? (
    <Loading />
  ) : (
    <Container className="cart-detail-page">
      <Row className="cart-header">
        <div className="go-back-button-container">
          <button
            type="button"
            className="go-back-button"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>Continue Shopping</span>
          </button>
        </div>
        <h2 className="page-name">SHOPPING CART</h2>
        <div className="cart-summary">
          <div className="cart-total">
            <span>You have</span>
            <span className="total-item">{`${totalCartItems} ${
              totalCartItems >= 2 ? "items" : "item"
            } in your cart `}</span>
          </div>
        </div>
      </Row>

      <Row className="cart-body">
        {cartItems.map((item) => (
          <CartItem
            key={item._id}
            cartItemId={item._id}
            productId={item.product_id._id}
            productName={item.product_id.name}
            image={item.product_id.image}
            pickup_point={item.product_id.pickup_point}
            price={item.product_id.price}
            stock_quantity={item.product_id.stock_quantity}
            adding_quantity={item.adding_quantity}
            subTotal={item.sub_total}
            updateQuantity={(quantity) =>
              handleUpdateQuantity(item._id, quantity)
            }
            deleteItem={() => handleDeleteItem(item._id)}
            isSelected={selectedItems.includes(item._id)}
            onSelectChange={handleSelectChange}
          />
        ))}
      </Row>
      <Row className="cart-footer">
        <div className="cart-footer-container">
          <div className="footer-content">
            <div className="order-total">
              <span>Order Total</span>
              <span className="total-item">{`(${totalOrderItems} ${
                totalOrderItems >= 2 ? "items" : "item"
              }): `}</span>
            </div>
            <div className="total-price">
              <span>{totalPrice}</span>
              <img
                src={coin}
                alt="coin"
                style={{ width: "25px", height: "25px" }}
              />
            </div>
          </div>
          <div>
            <button
              className="checkout-button"
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
            >
              Pay Now
            </button>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default CartDetail;
