import { Container, Col, Row, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Styles/SideBar.css";

const SideBar = ({ pageName, children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSubOptions, setShowSubOptions] = useState(false);

  return (
    <Container className="side-bar">
      <h3>{pageName}</h3>
      <Row sm={1} md={2} lg={2} className="">
        <Col sm={12} md={2} lg={2} className="left-container mb-4">
          <Button
            className="menu-item-btn"
            disabled={location.pathname === "/my-page"}
            onClick={() => navigate("/my-page")}
          >
            My Profile
          </Button>
          <Button
            className="menu-item-btn"
            onClick={() => setShowSubOptions(true)}
          >
            My Selling Page
          </Button>
          {showSubOptions && (
            <Container>
              <Button
                className="menu-item-btn"
                onClick={() => navigate("/selling-history")}
                disabled={location.pathname === "/selling-history"}
              >
                Inventory
              </Button>
              <Button
                className="menu-item-btn"
                onClick={() => navigate("/new-product")}
                disabled={location.pathname === "/new-product"}
              >
                New Product
              </Button>
            </Container>
          )}
          <Button
            className="menu-item-btn"
            disabled={location.pathname === "/purchase-history"}
            onClick={() => navigate("/purchase-history")}
          >
            My Purchase History
          </Button>
        </Col>
        <Col sm={12} md={10} lg={10} className="right-container">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default SideBar;