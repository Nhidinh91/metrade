import ProductCard from "../Components/ProductCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import style from "../Styles/Newsfeed.module.css";
import { useState, useEffect } from "react";
import Loading from "../Components/Loading";

const Newsfeed = () => {
  const [products, setProducts] = useState([]); //state to hold products fetch from backend
  const [visibleProducts, setVisibleProducts] = useState(8); //state to keep track of displaying products
  const [loading, setLoading] = useState(true); //Loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/product/newsfeed", //fetch products from backend
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setProducts(data);
        setLoading(false); //set loading to false after fetching products successfully
      } catch (error) {
        setError("Error fetching products");
        setLoading(false); //set loading to false after fetching products unsuccessfully
      }
    };
    fetchProducts();
  }, []);

  //Load more products when "Load more" button is clicked
  const loadMoreProducts = () => {
    setVisibleProducts(visibleProducts + 8);
  };

  if (loading) {
    return <Loading message="Loading..." />; //show loading... while fetching data
  }

  if (error) {
    return <h2>{error}</h2>; //show error message if failed to fetch search results
  }

  return (
    <Container fluid className={style.newfeed}>
      <Container>
        <h1 className="fw-bold">Newsfeed</h1>
      </Container>
      <Container>
        <Row sm={2} md={3} lg={4} className="g-4">
          {products.slice(0, visibleProducts).map((product) => (
            <Col key={product._id}>
              <ProductCard {...product} />
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="d-flex justify-content-center">
        {visibleProducts < products.length && (
          <Button variant="primary" className="mt-4" onClick={loadMoreProducts}>
            Load more...
          </Button>
        )}
      </Container>
    </Container>
  );
};

export default Newsfeed;
