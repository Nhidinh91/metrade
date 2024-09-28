import { useState, useEffect, useCallback, useRef } from "react";
import { Nav, Spinner } from "react-bootstrap";
import cartIcon from "../assets/cart.png";
import style from '../Styles/CartMenu.module.css';
import { useAuthContext } from "../hooks/useAuthContext";

const ProfileMenu = () => {
    const [loading, setLoading] = useState(true); 
    const { cartCount, setCartCount } = useAuthContext();

    useEffect(() => {
        const getCartDetail = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/get-cart-detail`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                });

                const data = await response.json();

                if (!response.ok) {
                    setLoading(false);
                    return;
                }

                if (response.ok) {
                    const cartDetail = data.cart_detail.cart_items || [];

                    const cartCount = cartDetail.reduce((acc, item) => acc + item.adding_quantity, 0);
                    setCartCount(cartCount);
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        getCartDetail();

    }, []);

    return (
        <Nav.Link href="/cart-detail">
            <div className={`${style.cart}`}>
                <img className={`${style.cartIcon}`} src={cartIcon} alt="cart" />
                <span className={`${style.cartCount}`}>
                    {loading ? <Spinner animation="border" size="sm" /> : cartCount}
                </span>
            </div>
        </Nav.Link>
    );
};

export default ProfileMenu;