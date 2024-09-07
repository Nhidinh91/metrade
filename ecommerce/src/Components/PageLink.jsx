import NavDropdown from 'react-bootstrap/NavDropdown';
import style from '../Styles/PageLink.module.css';

const PageLink = ({link, itemClass}) => {
  return (
    <NavDropdown id={link.id} title={link.main_category} className={`${itemClass} ${style.navDropdownToggle}`}>
      <NavDropdown.Item>{link.sub_categories}</NavDropdown.Item> {/* To be fixed */}
    </NavDropdown>
  )
}


export default PageLink;
