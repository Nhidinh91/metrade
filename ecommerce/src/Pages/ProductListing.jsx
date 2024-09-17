import { Container, Row, Col } from 'react-bootstrap';
// import { products } from '../dummyData';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from './Footer';
import ProductCard from '../Components/ProductCard';
import Header from './Header';

const ProductListing = ({}) => {
  const [searchParams] = useSearchParams();
  const subCategory = searchParams.get('query'); // This is equivalent to the category_id
  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log('category_id received in ProductListing to: ', subCategory);

  // const filteredProducts = products.filter(product => product.category_id === subCategory);

  useEffect(() => {
    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/categories/${subCategory}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        setFilteredProducts(data);
        console.log('Filtered products changed to:', data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [subCategory]);

  return (
    <>
      <Header></Header>
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
      <Footer></Footer>
    </>
  );
};

export default ProductListing;
