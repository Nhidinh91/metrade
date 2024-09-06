import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { products } from "../dummyData";
import ProductCard from "./ProductCard";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const [isSearched, setIsSearched] = useState(false); 

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setIsSearched(true);

    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filteredProducts = products.filter((product) =>
      product.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setSearchResults(filteredProducts); 
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for products by keyword..."
      />
      <button onClick={handleSearch}>Search</button>
      <Container>
        {searchResults.length > 0 ? (
          <Row sm={2} md={3} lg={4} className="g-4">
            {searchResults.map((product) => (
              <Col key={product.id}>
                <ProductCard {...product} />
              </Col>
            ))}
          </Row>
        ) : (
          isSearched && <p>No products found matching "{searchTerm}".</p> 
        )}
      </Container>
    </div>
  );
};

export default SearchBar;
