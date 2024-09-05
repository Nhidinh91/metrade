import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; 
import Hero from './Components/Hero';
import Navbar from './Components/Navbar.jsx';
// import './Navbar.module.css';


function App() {

  return (
    <>
    <Navbar />
      <Hero />
    </>
  );
}

export default App;
