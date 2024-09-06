import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Hero from "./Pages/Hero.jsx";
import Navbar from "./Pages/Navbar.jsx";
import Footer from "./Pages/Footer.jsx";
import Newsfeed from "./Pages/Newsfeed.jsx";


function App() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Newsfeed/>
    <Footer/>
    </>
  );
}

export default App;
