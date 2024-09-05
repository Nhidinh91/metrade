import heroImg from "../assets/heroNew.png";
import icon1 from "../assets/hero1.png";
import icon2 from "../assets/hero2.png";
import icon3 from "../assets/hero3.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import style from "./styles/Hero.module.css";

const Hero = () => {
  return (
    <Container fluid className={`${style.hero}`}>
      <Row>
        <Col className="text-center align-item-center">
          <h1 className="fw-bold">TRADE SMARTER, TOGETHER</h1>
          <p className="lead">Secure and Easy Transaction</p>
          <button type="button" className="btn btn-lg">
            Explore
          </button>
          <Row>
            <Col>
              <img src={icon1} alt="icon" style={{ width: "5rem" }} />
              <p>Environmentally Friendly</p>
            </Col>
            <Col>
              <img src={icon2} alt="icon" style={{ width: "5rem" }} />
              <p>Save Money</p>
            </Col>
            <Col>
              <img src={icon3} alt="icon" style={{ width: "5rem" }} />
              <p>Diverse</p>
            </Col>
          </Row>
        </Col>
        <Col className="d-flex justify-content-end align-items-end">
          <img src={heroImg} alt="hero img" />
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
