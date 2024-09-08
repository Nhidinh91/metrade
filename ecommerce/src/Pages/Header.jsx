import React from "react";
import logo2 from "../assets/logo-2-removebg.png";
import PageLinks from "../Components/PageLinks";
import { Navbar, Nav, NavDropdown, Container, Row, Col, Form, Button } from "react-bootstrap";
import style from '../Styles/Navbar.module.css';
import SearchBar from "../Components/SearchBar";

const Header = () => {
  return (
    <>
      <Navbar sticky="top" className={style.navBar}>
        <Row className={`${style.navUpper} w-100`}>
          <Container className="d-flex align-items-center justify-content-around">
            <Navbar.Brand href="/#home"><img src={logo2} alt="" height="100"/></Navbar.Brand>
            <SearchBar />
            <Button className={`${style.btnSellNow}`}>Sell Now</Button>
            <Nav.Link className={`${style.btnLogin}`} href="/login">Login</Nav.Link>
            <NavDropdown title={<i className={`${style.basketIcon} fa-solid fa-cart-shopping`} />} id="basic-nav-dropdown"></NavDropdown>
          </Container>
        </Row>
        <Row className="d-flex justify-content-center align-items-center vh=100"> 
            <PageLinks parentClass={`${style.navLinks}`} itemClass={`${style.navLink}`}/>
        </Row>
      </Navbar>
    </>
  );
};

export default Header;

