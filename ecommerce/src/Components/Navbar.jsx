import React from 'react';
import logo2 from '../assets/logo-2.png';
import PageLinks from "./PageLinks.jsx";

const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="nav-upper">

          <div className="nav-logo">
            <img src={logo2} alt="logo" className="logo" />
          </div>

          <div className='nav-search-bar'>
            <input type="text" className="search-bar" />
            <a
                href="https://www.google.com"
                target="_blank"
                rel="noreferrer"
                className="nav-icon"
              >
                <i className="fa-solid fa-magnifying-glass" />
              </a>
          </div>

          <div className='nav-buttons'>
            <button className="nav-sell-now">Sell Now</button>
            <button className="nav-login">Login</button>
            <a
                href="https://www.amazon.com"
                target="_blank"
                rel="noreferrer"
                className="nav-icon"
              >
                <i className="fa-solid fa-cart-shopping" />
              </a>
          </div>      
        </div>

        <div className="nav-lower">
          <PageLinks parentClass="nav-lower-links" itemClass="nav-lower-link" />
        </div>
      </nav>
    );
}

export default Navbar;