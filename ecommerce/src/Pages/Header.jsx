import React from "react";
import logo2 from "../assets/logo-2-removebg.png";
import PageLinks from "../Components/PageLinks";
import { Navbar, Nav, NavDropdown, Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import style from '../Styles/Navbar.module.css';
import SearchBar from "../Components/SearchBar";
import { useAuthContext } from '../hooks/useAuthContext';
import ProfileMenu from "../Components/ProfileMenu";
import AdminDropdown from "../Components/AdminDropdown";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

    const handleSellNowClick = () => {
      if (!user || user.role !== "seller") {
        setShowModal(true);
      } else {
        navigate("/new-product");
      }
    };

    const handleCloseModal = () => {
      setShowModal(false);
    };

  return (
    <>
      <Navbar sticky="top" className={style.navBar}>
        <Row className={`${style.navUpper} w-100`}>
          <Container className={`${style.navContainer}`}>
            <Navbar.Brand href="/">
              <img src={logo2} alt="" height="100" />
            </Navbar.Brand>
            <SearchBar />
            <div className={`${style.rightContainer}`}>
              <Button
                className={`${style.btnSellNow}`}
                onClick={handleSellNowClick}
              >
                Sell Now
              </Button>
              {!user ? (
                <Nav.Link className={`${style.btnLogin}`} href="/login">
                  Login
                </Nav.Link>
              ) : user.role === "admin" ? (
                <AdminDropdown />
              ) : (
                <ProfileMenu />
              )}
              <NavDropdown
                title={
                  <i
                    className={`${style.basketIcon} fa-solid fa-cart-shopping`}
                  />
                }
                id="basic-nav-dropdown"
              ></NavDropdown>
            </div>
          </Container>
        </Row>
        <Row className="d-flex justify-content-center align-items-center vh=100">
          <PageLinks
            parentClass={`${style.navLinks}`}
            itemClass={`${style.navLink}`}
          />
        </Row>
      </Navbar>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Access Restricted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please register or verify your email to access this feature.</p>
          <Link to="/signup"><Button>Signup Now</Button></Link>
          
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;

