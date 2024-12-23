import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
import { Link } from 'react-router-dom';
import {CategoryItem} from "../types";
import {useContext} from "react";
import {Category} from "../contexts/CategoryContext";

function HeaderDropdown() {

    const categories = useContext<CategoryItem[]>(Category);
  return (

      <div className="category">
          <button className="category-dropdown">Categories</button>
          <i className="fa-solid fa-caret-down"></i>
          <i className="fa-solid fa-caret-up"></i>
          <ul>
              {categories.map((item) =>    <li key={item.name}>
             <Link to ={`/categories/${item.name}`}>{item.name}</Link></li>)}

        </ul>

</div>

)
}
export default HeaderDropdown

