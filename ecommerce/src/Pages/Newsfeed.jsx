import { products } from "../dummyData";
import ProductCard from "../Components/ProductCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import style from "../Styles/Newsfeed.module.css";
import { useState } from "react";

const Newsfeed = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const loadMoreProducts = () => {
    setVisibleProducts(visibleProducts + 8);
  };
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
