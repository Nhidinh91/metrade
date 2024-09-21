import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../Styles/MyPage.css";
import ProductUpload from "../Components/ProductUpload";
import { useAuthContext } from "../hooks/useAuthContext";
import SideBar from "../Components/SideBar";

const NewProduct = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading && !isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <Container>
      <SideBar pageName="My Page">
        <ProductUpload />
      </SideBar>
    </Container>
  );
};

export default NewProduct;
