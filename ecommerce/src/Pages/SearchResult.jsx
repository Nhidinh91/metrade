import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductCard from "../Components/ProductCard";
import style from "../Styles/Newsfeed.module.css"; //Same styling as Newsfeed
import Loading from "../Components/Loading";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query"); //Extract search term from query parameter
  const [searchResults, setSearchResults] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8); //Keep track of the number of products to display
  const [loading, setLoading] = useState(true); //Loading state

  //Filter products based on the search query
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/product/search?query=${query}`,{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }}
          ); //fetch search results from backend
          const data = await response.json();
          setSearchResults(data);
          setLoading(false); //set loading to false after fetching search results successfully
        } catch (error) {
          console.error("Error fetching search results:", error.message);
          setLoading(false); //set loading to false after fetching search results unsuccessfully
        }    
      }}

      fetchSearchResults();
  }, [query]);

  //Load more products when "Load more" button is clicked
  const loadMoreProducts = () => {
    setVisibleProducts(visibleProducts + 8);
  };

  if (loading) {
    return <Loading message="Loading..." />; //show loading... while fetching data
  };

  return (
    <>
      <Container fluid className={style.newfeed}>
        <Container>
          <h2 >Search Results for "{query}"</h2>
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
    </>
  );
};

export default SearchResults;
