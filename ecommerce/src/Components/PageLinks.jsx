import NavDropdown from 'react-bootstrap/NavDropdown';
import style from '../Styles/PageLink.module.css';
import { useNavigate} from 'react-router-dom';
import { useEffect, useMemo, useState } from "react";

// Updated PageLinks component to work with new data structure
const PageLinks = ({ parentClass, itemClass }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories", {
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
    navigate(`/category?query=${category_id}`);
  };

  // Memoize category structure for performance
  const navLinks = useMemo(() => {
    // Step 1: Get the main categories where parent_id is null
    const mainCategories = categories.filter(category => !category.parent_id);
    
    // Step 2: For each main category, find and group its subcategories
    return mainCategories.map(mainCategory => {
      // Find subcategories whose parent_id matches the main category's _id
      const subCategories = categories.filter(
        category => category.parent_id && category.parent_id === mainCategory._id
      );
    // Step 3: Return an object with main category and its subcategories
      return {
        id: mainCategory._id,
        main_category: mainCategory.name,
        sub_categories: subCategories.map(subCategory => ({
          id: subCategory._id,
          name: subCategory.name})),
      };
    });
  }, [categories]);

  return (
    <div className={parentClass}>
      {navLinks.map((link) => (
        <NavDropdown 
          key={link.id} 
          id={link.id} 
          title={link.main_category} 
          className={`${itemClass} ${style.navDropdownToggle}`}
        >
          {link.sub_categories.map((subCategory) => ( 
            <NavDropdown.Item
              key={subCategory.id}
              onClick={() => handleSubCategoryClick(subCategory.id)}
            >
              {subCategory.name}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      ))}
    </div>
  );
};

export default PageLinks;
