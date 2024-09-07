import React from "react";
import logo2 from "../assets/logo-2-removebg.png";
import PageLinks from "../Components/PageLinks";
import { Navbar, Nav, NavDropdown, Container, Row, Col, Form, Button } from "react-bootstrap";
import style from '../Styles/Navbar.module.css';

const Header = () => {
  return (
    <>
      <Navbar sticky="top" className={style.navBar}>
        <Row className={`${style.navUpper} w-100`}>
          <Container className="d-flex align-items-center justify-content-around">
            <Navbar.Brand href="#home"><img src={logo2} alt="" height="100"/></Navbar.Brand>
            <Form inline>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className={style.searchBar}
                  />
                </Col>
                <Col>
                  <a
                      href="https://www.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="nav-icon"
                    >
                      <i className="fa-solid fa-magnifying-glass" />
                  </a>
                </Col>
              </Row>
            </Form>
            <Button className={`${style.btnSellNow}`}>Sell Now</Button>
            <Nav.Link className={`${style.btnLogin}`} href="#home">Login</Nav.Link>
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

