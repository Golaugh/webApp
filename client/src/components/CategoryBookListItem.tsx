import '../assets/css/CategoryBookListItem.css';
import '../types'
import "../types";
import {BookItem} from "../types";
import {useContext, useReducer} from "react";
import {CartStore} from "../contexts/CartContext";
import {cartReducer, initialCartState} from "../reducers/CartReducer";


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

// @ts-ignore
function CategoryBookListItem(props: BookItem) {
    const  {dispatch} = useContext(CartStore);
    const addToCart = () => {
        dispatch({id: props.bookId, type: "ADD", book: props});
        let id2name;
        if (props.bookId <= 1004) {id2name="Best Sellers";}
        else if (props.bookId <= 1008) {id2name="New Releases"}
        else if (props.bookId <= 1012) {id2name="Top Rated"}
        else {id2name="Old Fashioned"}
        localStorage.setItem("latestBookId", String(id2name));
    };
    // const [cart] = useReducer(cartReducer, initialCartState);
    // localStorage.setItem("cart", JSON.stringify(cart));
    // console.log(cart);
return (

    <li className="book">
        <section className="book-image">
            <img src={require(`../assets/images/books/` + bookImageFileName(props))}
                 alt={props.title}/>
        </section>
        <section className="info">
            <section className="name">{props.title}</section>
            <section className="synopsis">{props.description} <u>Read More</u></section>
            <section className="price">${props.price.toFixed(2)}</section>
            <section className="author">by {props.author}</section>
            <button className={bookPublic(props)}>Read Now</button>
            <button className={bookCart(props)} onClick={addToCart}>Add to Cart</button>
        </section>
    </li>
)
}

export default CategoryBookListItem;
