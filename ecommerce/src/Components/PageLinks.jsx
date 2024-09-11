import { navLinks } from "../dummyData.js";
import PageLink from "./PageLink.jsx";
import NavDropdown from 'react-bootstrap/NavDropdown';


const PageLinks = ({ parentClass, itemClass, onSelectSubCategory }) => {
  return (
    <div className={parentClass}>
      {navLinks.map((link) => (
        <NavDropdown key={link.id} id={link.id} title={link.main_category} className={itemClass}>
          {link.sub_categories.map((subCategory, index) => (
            <NavDropdown.Item 
              key={index}
              onClick={() => onSelectSubCategory(subCategory)}
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
