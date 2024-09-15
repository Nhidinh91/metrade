import ProductCard from "../Components/ProductCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import style from "../Styles/Newsfeed.module.css";
import { useState, useEffect } from "react";
import Loading from "../Components/Loading";

const Newsfeed = () => {
  const [products, setProducts] = useState([]); //state to hold products fetch from backend
  const [loading, setLoading] = useState(true); //Loading state
  const [page, setPage] = useState(1); //state to keep track of the current page
  const [hasMore, setHasMore] = useState(true); //check if more products are available
  const [error, setError] = useState(null); //error state
  const limit = 8; //limit of products to fetch per page

  useEffect(() => {
    let isMounted = true; //track if the component is mounted

    //Fetch products from backend
    const fetchProducts = async () => {
      setLoading(true); //set loading when fetching new data
      try {
        const response = await fetch(
          `http://localhost:3000/api/product/newsfeed?page=${page}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (isMounted) {
          setProducts((prevProducts) => {
            const newProducts = [...prevProducts, ...data.products];
            setHasMore(newProducts.length < data.totalProducts); //check if more products are available
            return newProducts;
          });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        } //set loading to false after fetching products
      }
    };
    fetchProducts();

    return () => {
      isMounted = false; //cleanup function to track if the component is unmounted
    };
  }, [page]);

  // Load more products when "Load more" button is clicked
  const loadMoreProducts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (error) {
    return (
      <>
        <h1 className={style.error}>Error: {error}</h1>
        <Container style={{ height: "200px" }}></Container>
      </>
    );
  }

  if (loading) {
    return <Loading message="Loading..." />; //show loading... while fetching data
  }

  return (
    <Container fluid className={style.newfeed}>
      <Container>
        <h1 className="fw-bold">Newsfeed</h1>
      </Container>
      <Container>
        <Row sm={2} md={3} lg={4} className="g-4">
          {products.map((product) => (
            <Col key={product._id}>
              <ProductCard {...product} />
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="d-flex justify-content-center">
        {hasMore && (
          <Button variant="primary" className="mt-4" onClick={loadMoreProducts}>
            Load more...
          </Button>
        )}
      </Container>
    </Container>
  );
};

export default Newsfeed;
