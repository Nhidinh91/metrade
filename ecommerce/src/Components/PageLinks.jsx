import { categories } from "../dummyData.js";
import NavDropdown from 'react-bootstrap/NavDropdown';
import style from '../Styles/PageLink.module.css';
import { useNavigate} from 'react-router-dom';
import { useMemo } from "react";

// Updated PageLinks component to work with new data structure
const PageLinks = ({ parentClass, itemClass }) => {
  const navigate = useNavigate();

  // Function to handle subcategory click
  const handleSubCategoryClick = (subCategory) => {
    navigate(`/category?query=${subCategory}`);
  };

  // Memoize category structure for performance
  const navLinks = useMemo(() => {
    // Step 1: Get the main categories where parent_id is null
    const mainCategories = categories.filter(category => !category.parent_id);
    
    // Step 2: For each main category, find and group its subcategories
    return mainCategories.map(mainCategory => {
      // Find subcategories whose parent_id matches the main category's _id
      const subCategories = categories.filter(
        category => category.parent_id && category.parent_id.$oid === mainCategory._id.$oid
      );
    // Step 3: Return an object with main category and its subcategories
      return {
        id: mainCategory._id.$oid,
        main_category: mainCategory.name,
        sub_categories: subCategories.map(subCategory => subCategory.name),
      };
    });
  }, [categories]);

  return (
    <div className={parentClass}>
      {navLinks.map((link) => (
        <NavDropdown key={link.id} id={link.id} title={link.main_category} className={`${itemClass} ${style.navDropdownToggle}`}>
          {link.sub_categories.map((subCategory, index) => (
            <NavDropdown.Item
              key={index}
              onClick={() => handleSubCategoryClick(subCategory)}
            >
              {subCategory}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      ))}
    </div>
  );
};

export default PageLinks;
