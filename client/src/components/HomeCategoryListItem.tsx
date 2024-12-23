import '../assets/css/HomeCategoryListItem.css';
import '../types'
import "../types";
import {BookItem} from "../types";


const bookImageFileName =  (book:BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    return `${name}.jpg`;
};

const bookPublic = (book:BookItem) => {
    let publicRead = "read-now"
    if (!book.isFeatured) {publicRead = "goonies read-now";}
    return publicRead;
}

const bookCart = (book:BookItem) => {
    let publicCart = "add-to-cart"
    if (!book.isFeatured) {publicCart = "no-read-now add-to-cart";}
    return publicCart;
}

function HomeBookListItem(props:BookItem) {
    return (

        <li className="home-book">
            <section className="home-book-image">
                <img src={require('../assets/images/books/' + bookImageFileName(props))}
                     alt="book.title"/>
            </section>
            <section className="home-info">
                <section className="name">{props.title}</section>
                <section className="price">${props.price}</section>
                <section className="author">by {props.author}</section>
                <button className={bookPublic(props)}>Read Now</button>
                <button className={bookCart(props)}>Add to Cart</button>
            </section>
        </li>
    )
}
export default HomeBookListItem;
