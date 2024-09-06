import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Hero from "./Components/pageComponents/Hero.jsx";
import Navbar from "./Components/pageComponents/Navbar.jsx";
import Footer from "./Components/pageComponents/Footer.jsx";
import Newsfeed from "./Components/pageComponents/Newsfeed.jsx";


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
