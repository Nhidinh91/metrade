import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../Styles/MyPage.css";
import AdminProductComp from "../Components/AdminProductComp";
import { useAuthContext } from "../hooks/useAuthContext";
import AdminSideBar from "../Components/AdminSideBar";

const AdminProduct = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading && !isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated(), isLoading, navigate]);

  return (
    <Container>
      <AdminSideBar pageName="Admin Dashboard">
        <AdminProductComp />
      </AdminSideBar>
    </Container>
  );
};

export default AdminProduct;
