import coin from "../assets/star.png";
import clock from "../assets/clock.png";
import locImg from "../assets/location.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import "../Styles/ProductDetail.css";

const ProductDetail = () => {
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
        const response = await fetch(`http://localhost:3000/api/product/${id}`);
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
        <div className="product-detail-page">
          <div className="go-back-button">
            <i className="fa-solid fa-arrow-left"></i>Back to Home
          </div>
          <div className="product-detail-container">
            <section className="product-info-container">
              <div>
                <p>Category Breadcrum</p>
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
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </div>
                  <span className="quantity-number">{quantity}</span>
                  <div
                    className="quantity-btn"
                    onClick={() => setQuantity(quantity + 1)}
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
            <section className="photos-container">
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
                    <img
                      src={photo}
                      key={index}
                      alt={`Photo ${index + 1}`}
                      className="small-photo"
                      style={{
                        border:
                          index === bigPhotoIndex ? "1px solid orange" : "none",
                      }}
                    />
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
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
