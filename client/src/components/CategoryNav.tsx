import '../assets/css/CategoryNav.css'
import '../assets/css/global.css'
import {CategoryItem} from '../types';
import {Link} from "react-router-dom";
import {useContext} from "react";
import {Category} from "../contexts/CategoryContext";

function CategoryNav() {

    const categories = useContext<CategoryItem[]>(Category);
  return (
      <nav className="category-nav">
        <h3>Categories</h3>

        <ul className="category-tab">
          {categories.map((item) => <li key={item.name}>
            <Link to={`/categories/${item.name}`}>{item.name}</Link>
          </li>)}
        </ul>
      </nav>
  )
}

export default CategoryNav;

