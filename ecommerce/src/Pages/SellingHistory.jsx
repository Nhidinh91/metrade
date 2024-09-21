import ProductStatus from "../Components/ProductStatus.jsx";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ProfileImage from '../assets/profile-default-image.png';
import '../Styles/SellingHistory.css';

const SellingHistory = () => {
    const [allProductsFetched, setAllProductsFetched] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { user, updateUser } = useAuthContext();


    useEffect(() => {
        // Fetch products from backend
        const fetchProducts = async () => {
        try {
            const response = await fetch(
            `${process.env.REACT_APP_API_URL}/product/selling-page/inventory/${user._id}`,
            {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            }
            );
            const data = await response.json();
            setAllProductsFetched(data);
            setFilteredProducts(data);


        } catch (error) {
            console.error('Error fetching products:', error);
        }
        };

    fetchProducts();
  }, [user]);

    function handleClickAll() {
        setFilteredProducts(allProductsFetched);     
    }    
    
    function handleClickActive() {
        setFilteredProducts(allProductsFetched.filter(product => product.status === 'active'));
    }    
    function handleClickProcessing() {
        setFilteredProducts(allProductsFetched.filter(product => product.status === 'processing'));
    }

    function handleClickSold() {
        setFilteredProducts(allProductsFetched.filter(product => product.status === 'sold'));
    }


    return (
    <>
        <Row>
            <Col>
                <div className="d-flex flex-column align-items-center" >
                    <div className="sellerImgContainer">
                        <img src={ProfileImage} alt="Profile" className="sellerImg" />
                        <h2>{user.first_name}{user.last_name[0]}</h2>
                    </div>
                    <p>BALANCE: {user.balance}</p>
                    <p>{filteredProducts.length} items</p>
                </div>
            </Col>
            <Col className="buttons">
                <Button className="btnSort" onClick={handleClickAll}>All</Button>
                <Button className="btnSort" onClick={handleClickActive}>Active</Button>
                <Button className="btnSort" onClick={handleClickProcessing}>Processing</Button>
                <Button className="btnSort" onClick={handleClickSold}>Sold</Button>
            </Col>
        </Row>

      <Container>
        {filteredProducts.length > 0 ? (
          <Row sm={2} md={3} lg={4} className="g-4">
            {filteredProducts.map((product) => (
              <Col key={product.id}>
                <ProductStatus {...product} />
              </Col>
            ))}
          </Row>
        ) : (
          <p>No products found</p>
        )}
      </Container>
    </>
    );
}

export default SellingHistory;