import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Hero from "./Pages/Hero.jsx";
import Navbar from "./Pages/Navbar.jsx";
import Footer from "./Pages/Footer.jsx";
import Newsfeed from "./Pages/Newsfeed.jsx";
import SearchBar from "./Components/SearchBar.jsx";


function App() {
  return (
    <>
    <SearchBar />
    </>
  );
}

export default App;
