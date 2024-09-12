import { Card, Button } from "react-bootstrap";
import coin from "../assets/star.png";
import clock from "../assets/clock.png";
import locImg from "../assets/location.png";
import style from "../Styles/ProductCard.module.css";

const ProductCard = ({ name, image, pickup_point, price, created_at }) => {
  //calculate days since creation
  const daysSinceCreation = Math.floor(
    (Date.now() - new Date(created_at)) / (1000 * 60 * 60 * 24)
  );
  return (
    <Card className={style.productCard}>
      <Card.Img variant="top" src={image} className={style.productImg} alt={name} />
      <Card.Body>
        <Card.Title className="fw-bold" style={{ color: "#173b45" }}>
          {name}
        </Card.Title>
        <div className="d-flex align-items-center">
          <img
            src={coin}
            alt="coin"
            style={{ width: "20px", height: "20px" }}
          />
          <Card.Text>{price}</Card.Text>
        </div>
        <div className="d-flex align-items-center">
          <img
            src={clock}
            alt="clock"
            style={{ width: "20px", height: "20px" }}
          />
          <Card.Text>{daysSinceCreation} days ago</Card.Text>
        </div>
        <div className="d-flex align-items-center">
          <img
            src={locImg}
            alt="location"
            style={{ width: "20px", height: "20px" }}
          />
          <Card.Text>{pickup_point}</Card.Text>
        </div>
        <div className="d-flex justify-content-end">
          <Button variant="primary" hidden>
            Edit
          </Button>
          <Button variant="primary">See more...</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
