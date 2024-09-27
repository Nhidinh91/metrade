import { useEffect, useState } from "react";
import MainCategory from "./MainCategory.jsx";
import style from "../Styles/Navbar.module.css"
import { useCategoryContext } from "../contexts/CategoryContext";

// Updated PageLinks component to work with new data structure
const PageLinks = ({ parentClass, itemClass }) => {
  const { categories, loading } = useCategoryContext();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <MainCategory categories={categories} />
        </div>
    </nav>
  );
};

export default PageLinks;