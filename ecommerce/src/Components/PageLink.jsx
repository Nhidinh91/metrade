import NavDropdown from 'react-bootstrap/NavDropdown';
import style from '../Styles/PageLink.module.css';
import { useState } from "react";
import { products } from "../dummyData";
import ProductCard from './ProductCard';

const PageLink = ({link, itemClass, onSelectSubCategory}) => {
  return (
      <NavDropdown id={link.id} title={link.main_category} className={`${itemClass} ${style.navDropdownToggle}`}>
        {link.sub_categories.map((subCategory, index) => (
          <NavDropdown.Item 
          key={index}
          onClick={() => onSelectSubCategory(subCategory)}
          >
            {subCategory}
            </NavDropdown.Item>
        ))}
      </NavDropdown>
  );
};



export default PageLink;
