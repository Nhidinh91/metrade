import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Hero from "./Components/pageComponents/Hero.jsx";
import Navbar from "./Components/pageComponents/Navbar.jsx";
import Container from "react-bootstrap/esm/Container.js";
import Row from "react-bootstrap/Row";
// import './Navbar.module.css';

function App() {
  return (
    <>
       {/*  <Navbar /> */}
        <Hero />
    </>
  );
}

export default App;
