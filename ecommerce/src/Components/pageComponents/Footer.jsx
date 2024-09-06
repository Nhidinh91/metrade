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
                        <Button className='btn-white'>Contact Us</Button>
                    </Col>
                </Row>
            </Col>

            <Col className='footer-lower text-center py-3'>
                
                <p>&copy; 2021 Metrade. All rights reserved.</p>   
            </Col>
        </Container>
    </footer>
  );
};

export default Footer;
