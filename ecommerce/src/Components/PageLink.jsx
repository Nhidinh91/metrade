import NavDropdown from 'react-bootstrap/NavDropdown';
import style from '../Styles/PageLink.module.css';

const PageLink = ({link, itemClass}) => {
  return (
     <NavDropdown id={link.id} title={link.main_category} className={`${itemClass} ${style.navDropdownToggle}`}>
      {link.sub_categories.map((subCategory, index) => (
        <NavDropdown.Item key={index}>{subCategory}</NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};



export default PageLink;
