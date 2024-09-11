import { Container, Row, Col } from 'react-bootstrap';
import { products } from '../dummyData';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';  


const ProductListing = ({ }) => {
  const [searchParams] = useSearchParams();
  const subCategory = searchParams.get('query');
  const filteredProducts = products.filter(product => product.category_id === subCategory);

  
  return (
    <>
      <Container>
        {filteredProducts.length > 0 ? (
          <Row sm={2} md={3} lg={4} className="g-4">
            {filteredProducts.map((product) => (
              <Col key={product.id}>
                <ProductCard {...product} />
              </Col>
            ))}
          </Row>
        ) : (
          <p>No products found</p>
        )}
      </Container>
    </>
  );
};

export default ProductListing;