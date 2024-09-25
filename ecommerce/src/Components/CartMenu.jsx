import { Nav } from "react-bootstrap";
import cartIcon from "../assets/cart.png";
import style from '../Styles/CartMenu.module.css';

const ProfileMenu = () => {

    return (
        <Nav.Link href="/cart">
            <div className={`${style.cart}`}>
                <img className={`${style.cartIcon}`} src={cartIcon} alt="cart" />
                <span className={`${style.cartCount}`}>0</span>
            </div>
        </Nav.Link>
    );
};

export default ProfileMenu;