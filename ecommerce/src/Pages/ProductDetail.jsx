import coin from "../assets/star.png";
import clock from "../assets/clock.png";
import locImg from "../assets/location.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";

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
    Math.floor((Date.now() - new Date(dayCreated)) / (1000 * 60 * 60 * 24));
  };

  // If the product data is still being fetched, display a Bootstrap spinner
  return (
    <div>
      {/* Conditionally render either the spinner or the product details */}
      {!product ? (
        <Loading />
      ) : (
        <div>
          <section className="card-info">
            <div>
              <p>Category Breadcrum</p>
            </div>
            <h2 className="product-name">{product.name}</h2>
            <div className="product-price">
              {product.price}
              <img src={coin} alt="coin" />
            </div>
            <div className="days-from-creation">
              {daysCreation(product.created_at)}
              <img src={clock} alt="clock" />
            </div>
            <div className="location">
              {product.pickup_point}
              <img src={locImg} alt="location" />
            </div>
            <p className="description">{product.description}</p>
            <div>
              <div className="quantity-container">
                <span
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </span>
                <span>{quantity}</span>
                <span
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </span>
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
              <img src={product.photos[bigPhotoIndex]}></img>
            </div>
            <div className="small-photos">
              <span
                className="previous-button"
                onClick={() =>
                  setBigPhotoIndex(bigPhotoIndex <= 0 ? 0 : bigPhotoIndex - 1)
                }
              >
                {"<"}
              </span>
              {product.photos.map((photo, index) => {
                <img
                  src={photo}
                  key={index}
                  alt={`Photo ${index + 1}`}
                  style={{
                    border:
                      index === bigPhotoIndex ? "1px solid orange" : "none",
                  }}
                />;
              })}
              <span
                className="next-button"
                onClick={() =>
                  setBigPhotoIndex(
                    bigPhotoIndex >= product.photos.length - 1
                      ? product.photos.length - 1
                      : bigPhotoIndex + 1
                  )
                }
              >
                {">"}
              </span>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
