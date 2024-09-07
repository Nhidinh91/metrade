import { navLinks } from "../dummyData.js";
import PageLink from "./PageLink.jsx";
import NavDropdown from 'react-bootstrap/NavDropdown';


const PageLinks = ({ parentClass, itemClass }) => {
  return (
    <ul className={parentClass} id="nav-links">
      {navLinks.map((link) => {
        return <PageLink key={link.id} link={link} itemClass={itemClass} />;
      })}
    </ul>
  );
};
export default PageLinks;
