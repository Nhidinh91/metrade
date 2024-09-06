import React from 'react'
import {Container, Row, Col, Button} from "react-bootstrap";
// import style from "./styles/Hero.module.css";

const Footer = () => {
  return (
    <footer className='footer'>
        <Container fluid>
            <Col className='footer-upper'>
                <Row>
                    <Col md={8}>
                        <h1>Metrade</h1>
                        <p>Metrade is the exclusive marketplace for the Metropolia University community, designed to help students and staff buy, sell, and trade with ease. Join us in connecting the campus one trade at a time.</p>
                    </Col>
                    <Col md={4}>
                        <Button className='btn-empty'>Contact Us</Button>
                    </Col>
                </Row>
            </Col>

            <Col className='footer-lower text-center py-3'>
                <Col>
                    <a href='https://www.facebook.com' target='_blank' rel='noreferrer'><i className="fa-brands fa-facebook-f"/></a>
                    <a href='https://www.instagram.com' target='_blank' rel='noreferrer'><i className="fa-brands fa-instagram"></i></a>
                    <a href='https://www.twitter.com' target='_blank' rel='noreferrer'><i className="fa-brands fa-twitter"></i></a>
                    <a href='https://www.linkedin.com' target='_blank' rel='noreferrer'><i className="fa-brands fa-linkedin"></i></a>
                </Col> 
                <Col>
                    <p>&copy; Metrade 2024. All rights reserved.</p>   
                </Col>
            </Col>
        </Container>
    </footer>
  );
};

export default Footer;
