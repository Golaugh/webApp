import HeaderDropdown from './HeaderDropdown';
import '../assets/css/global.css'
import '../assets/css/AppHeader.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import {useContext} from "react";
import {ShoppingCartItem} from "../types";
import {CartStore} from "../contexts/CartContext";

function AppHeader() {

    // @ts-ignore
    const {cart} = useContext<ShoppingCartItem[]>(CartStore);
    const cartAmount = cart.reduce((acc: number, item:ShoppingCartItem) => acc + item.quantity, 0);

    return(

    <header>
        <section className="logo">
            <i className="fa-solid fa-angle-left"></i>
            <i className="fa-solid fa-angle-right"></i>
            <h2><Link to="/" className="logo_name">Colin's Book</Link></h2>
        </section>

        <section className="search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <form action="">
                <input type="text" className="search-bar" placeholder="Find some books here..."/><br/>
            </form>
        </section>

        <section className="header-dropdown-and-cart">
            <HeaderDropdown/>
        </section>

        <section className="cart">
            <Link to="/cart"><i className="fa-solid fa-cart-shopping"></i></Link>
            <span>{cartAmount}</span>
        </section>

        <section className="user">
            <Link to="/user"><i className="fa-solid fa-user-large"></i>
            <span>Colin</span></Link>
            <Link to="/login"><i className="fa-solid fa-right-from-bracket"></i></Link>
        </section>

    </header>
)
}

export default AppHeader;