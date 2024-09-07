import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Hero from "./Pages/Hero.jsx";
import Header from "./Pages/Header.jsx";
import Footer from "./Pages/Footer.jsx";
import Newsfeed from "./Pages/Newsfeed.jsx";
import AboutContact from "./Pages/AboutContact.jsx";
import SearchBar from "./Components/SearchBar.jsx";


function App() {
  return (
    <>
    <Header/>
    {/* <SearchBar /> */}
    {/* <AboutContact/> */}
    {/* <Hero/> */}
    <Newsfeed/>
    <Footer/>

    </>
  );
}

export default App;
