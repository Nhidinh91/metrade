import React from "react";
import logo2 from "../assets/logo-2.png";
import PageLinks from "../Components/PageLinks";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-upper">
        <div className="nav-logo">
          <img src={logo2} alt="logo" className="logo" />
        </div>

        <div className="nav-search-bar">
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

        <div className="nav-buttons">
          <div className="nav-sell-now">
            <button className="btn-navy">Sell Now</button>
          </div>
          <div className="nav-login">
            <button className="btn-transparent">Login</button>
          </div>
          <div className="nav-cart">
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
      </div>

      <div className="nav-lower">
        <PageLinks parentClass="nav-lower-links" itemClass="nav-lower-link" />
      </div>
    </nav>
  );
};

export default Navbar;
