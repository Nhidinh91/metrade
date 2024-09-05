import { products } from "../dummyData";
import { Card, Button } from "react-bootstrap";
import coin from "../images/star.png";
import img from "../images/hero.png";
import style from "./styles/ProductCard.module.css";

const ProductCard = () => {  

  return (
    <Card className={style.productCard}>
      <Card.Img variant="top" src={img} className="productImg" />
      <Card.Body>
        <Card.Title className="fw-bold" style={{ color: "#173b45" }}>Card Title</Card.Title>
        <div className="d-flex align-items-center">
          <img src={coin} alt="coin" style={{ width: "20px" }} />
          <Card.Text>Price</Card.Text>
        </div>
        <Card.Text>PickUp</Card.Text>
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
