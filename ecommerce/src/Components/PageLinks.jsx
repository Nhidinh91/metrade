import { useEffect, useState } from "react";
import MainCategory from "./MainCategory.jsx";
import style from "../Styles/Navbar.module.css"

// Updated PageLinks component to work with new data structure
const PageLinks = ({ parentClass, itemClass }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/main-category/main-relationship`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <MainCategory categories={categories} />
        </div>
    </nav>
  );
};

export default PageLinks;