import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { products } from "../dummyData";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductCard from "../Components/ProductCard";
import Header from "./Header";
import Footer from "./Footer";
import style from "../Styles/Newsfeed.module.css"; //Same styling as Newsfeed

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query"); //Extract search term from query parameter
  const [searchResults, setSearchResults] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8); //Keep track of the number of products to display

  //Filter products based on the search query
  useEffect(() => {
    if (query) {
      const filteredProducts = products.filter((product) =>
        product.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query.toLowerCase())
        )
      );
      setSearchResults(filteredProducts);
    }
  }, [query]);

  //Load more products when "Load more" button is clicked
  const loadMoreProducts = () => {
    setVisibleProducts(visibleProducts + 8);
  };

  return (
    <>
      <Header />
      <Container fluid className={style.newfeed}>
        <Container>
          <h1 className="fw-bold">Search Results for "{query}"</h1>
        </Container>
        <Container>
          {searchResults.length > 0 ? (
            <Row sm={2} md={3} lg={4} className="g-4">
              {searchResults.slice(0, visibleProducts).map((product) => (
                <Col key={product.id}>
                  <ProductCard {...product} />
                </Col>
              ))}
            </Row>
          ) : (
            <p>No products found matching "{query}".</p>
          )}
        </Container>
        <Container className="d-flex justify-content-center">
          {/*Only show "Load More" button if there are more than 8 products to show*/}
          {visibleProducts < searchResults.length && (
            <Button
              variant="primary"
              className="mt-4"
              onClick={loadMoreProducts}
            >
              Load more...
            </Button>
          )}
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default SearchResults;
