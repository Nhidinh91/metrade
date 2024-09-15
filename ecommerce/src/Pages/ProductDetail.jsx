import coin from "../assets/star.png";
import clock from "../assets/clock.png";
import locImg from "../assets/location.png";
import { useEffect, useState } from "react";
import { useParams,  useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import "../Styles/ProductDetail.css";
import { Breadcrumb, Row, Col, Container} from "react-bootstrap";

const ProductDetail = () => {
  const navigate = useNavigate();
  // Get the 'id' parameter from the URL
  const { id } = useParams();
  // States to store product data, change quantity, and big photo
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [bigPhotoIndex, setBigPhotoIndex] = useState(0);

  useEffect(() => {
    // Fetch the product data using the 'id'
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/product/detail/${id}`
        );
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]); // 'id' is used as a dependency to refetch if the id changes
  const daysCreation = (dayCreated) => {
    return Math.floor(
      (Date.now() - new Date(dayCreated)) / (1000 * 60 * 60 * 24)
    );
  };

  // If the product data is still being fetched, display a Bootstrap spinner
  return (
    <>
      {/* Conditionally render either the spinner or the product details */}
      {!product ? (
        <Loading />
      ) : (
        <Container className="product-detail-page">
          <Row className="product-detail-container" sm={1} md={2} lg={2}>
            <Col sm={12} md={6} lg={6}>
              <div className="go-back-button-container">
                <button type="button" className="go-back-button" onClick={() => navigate(-1)}>
                  <i className="fa-solid fa-arrow-left"></i>Back to Home
                </button>
              </div>
              <section className="product-info-container">
                <div>
                  <Breadcrumb>
                    {product.category_id.ancestors.map((ancestor) => (
                      <Breadcrumb.Item
                        key={ancestor._id}
                        // linkAs={Link}
                        // linkProps={{ to: `/category/${ancestor._id}` }}
                      >
                        {ancestor.name}
                      </Breadcrumb.Item>
                    ))}
                    <Breadcrumb.Item active>
                      {product.category_id.name}
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <h2 className="product-name">{product.name}</h2>
                <div className="product-price">
                  <span>{product.price}</span>
                  <img src={coin} alt="coin" />
                </div>
                <div className="days-from-creation">
                  <img src={clock} alt="clock" />
                  <div>{daysCreation(product.created_at)} days</div>
                </div>
                <div className="location">
                  <img src={locImg} alt="location" />
                  <div>{product.pickup_point}</div>
                </div>
                <p className="product-description">{product.description}</p>
                <div className="add-product-container">
                  <div className="quantity-container">
                    <div
                      className="quantity-btn"
                      onClick={() =>
                        setQuantity(quantity <= 0 ? 0 : quantity - 1)
                      }
                    >
                      <i className="fa-solid fa-minus"></i>
                    </div>
                    <span className="quantity-number">{quantity}</span>
                    <div
                      className="quantity-btn"
                      onClick={() =>
                        setQuantity(
                          quantity >= product.stock_quantity
                            ? quantity
                            : quantity + 1
                        )
                      }
                    >
                      <i className="fa-solid fa-plus"></i>
                    </div>
                  </div>
                  <button
                    className="add-card-btn"
                    type="button"
                    name="add-to-cart-button"
                  >
                    Add to Cart
                  </button>
                </div>
              </section>
            </Col>
            <Col className="photos-container" sm={12} md={6} lg={6}>
              <div className="big-photo">
                <img src={product.photos[bigPhotoIndex]} />
              </div>
              <div className="small-photos-container">
                <div className="change-photo-button left">
                  <i
                    className="fa-solid fa-chevron-left"
                    onClick={() =>
                      setBigPhotoIndex(
                        bigPhotoIndex <= 0 ? 0 : bigPhotoIndex - 1
                      )
                    }
                  ></i>
                </div>
                <div className="small-photos">
                  {product.photos.map((photo, index) => (
                    <button
                      onClick={() => {
                        setBigPhotoIndex(index);
                      }}
                      className="image-gallery-thumbnail"
                      key={index}
                      style={{
                        border:
                          index === bigPhotoIndex
                            ? "2.5px solid orange"
                            : "none",
                      }}
                    >
                      <span className="image-gallery-thumbnail-inner">
                        <img
                          src={photo}
                          key={index}
                          alt={`Photo ${index + 1}`}
                          className="small-photo image-gallery-thumbnail-image"
                        />
                      </span>
                    </button>
                  ))}
                </div>
                <div className="change-photo-button right">
                  <i
                    className="fa-solid fa-chevron-right"
                    onClick={() =>
                      setBigPhotoIndex(
                        bigPhotoIndex >= product.photos.length - 1
                          ? product.photos.length - 1
                          : bigPhotoIndex + 1
                      )
                    }
                  ></i>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProductDetail;
