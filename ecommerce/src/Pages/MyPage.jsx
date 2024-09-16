import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../Styles/MyPage.css";
import AccountInfo from "../Components/AccountInfo";
import { useAuthContext } from "../hooks/useAuthContext";

const MyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  
  return (
    <Container className="my-page">
      <h3>My Page</h3>
      <Row sm={1} md={2} lg={2} className="">
        <Col sm={12} md={2} lg={2} className="left-container mb-4">
          <Link to="/my-page">
            <Button
              className="menu-item-btn"
              disabled={location.pathname === "/my-page"}
            >
              My Profile
            </Button>
          </Link>
          <Link to="/selling-history">
            <Button className="menu-item-btn">My Selling Page</Button>
          </Link>
          <Link to="/purchase-history">
            <Button className="menu-item-btn">My Purchase History</Button>
          </Link>
        </Col>
        <Col sm={12} md={10} lg={10} className="right-container">
          <AccountInfo />
        </Col>
      </Row>
    </Container>
  );
};

export default MyPage;
