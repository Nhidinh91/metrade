import {Nav, NavDropdown, Navbar} from 'react-bootstrap';
import style from '../Styles/PageLinks.module.css';
import { useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";

// Updated PageLinks component to work with new data structure
const PageLinks = ({ parentClass, itemClass }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories/main-category/main-relationship", {
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

  // Function to handle subcategory click
  const handleSubCategoryClick = (category_id) => {
    console.log(`Sending category_id from PageLinks: ${category_id}`);
    navigate(`/category?query=${category_id}`);
  };

// Function to display main categories, sub-categories and sub-categories' children
  const categoryShow = (categories) => {
    return categories.map((category, index) => {
      if (category.children && category.children.length > 0) {
          return (
            <NavDropdown
              key={index}
              id={category._id}  
              title={category.name}
              size="lg"
              className={`${itemClass} dropdown-menu-dark 
                                       dropend`}

            >
              {categoryShow(category.children)}
            </NavDropdown>
          );
      } else {
        return (
          <Nav.Link
            key={index}
            id={category._id}
            onClick={() => handleSubCategoryClick(category._id)}
          >
            {category.name}
          </Nav.Link>
        )
      }
    });
  };


  return (
      <Navbar className={`${parentClass} ${style.navBar}`}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
          <Nav
            className={`d-flex justify-content-center align-items-center mr-auto`}
          >
            {categoryShow(categories)}
          </Nav>
        {/* </Navbar.Collapse> */}
      </Navbar>
  );
};

export default PageLinks;
