import { navLinks } from "../dummyData.js";
import NavDropdown from 'react-bootstrap/NavDropdown';
import style from '../Styles/PageLink.module.css';
import {Link, useNavigate} from 'react-router-dom';


const PageLinks = ({ parentClass, itemClass }) => {
  const navigate = useNavigate();
  const handleSubCategoryClick = (subCategory) => {
    navigate(`/category?query=${subCategory}`);
  };
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
