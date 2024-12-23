
import  "../assets/css/CartTable.css"
import { BookItem } from "../types";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";

const getBookImageUrl = function (book: BookItem): string {
    let filename = book.title.toLowerCase().replace(/ /g, "-").replace(/'/g, "");
    return `${filename}.jpg`;
};
 // @ts-ignore
function CartTable({booklist, quantity}) {
    const  {dispatch} = useContext(CartStore);
    const addToCart = () => {
        dispatch({ id: booklist.bookId, type: "ADD", book: booklist });
    };
    const removeFromCart = () => {
        dispatch({ id: booklist.bookId, type: "REMOVE", book: booklist });
    };

    return (
        <div className="cart-table">
            <ul className="cart2">
                <div className="cart-table">
                        <div className="cart-book-image">
                            <img src={require(`../assets/images/books/` + getBookImageUrl(booklist))}
                                 alt={booklist.title}/>
                        </div>
                        <div className="cart-book-title">{booklist.title}</div>
                        <div className="cart-book-price">${booklist.price.toFixed(2)}</div>
                        <div className="cart-book-quantity">
                            <button className="icon-button inc-button" onClick={addToCart}>
                                <i className="fas fa-plus-circle" />
                            </button>
                            <span className="quantity"> {quantity} </span>
                            <button className="icon-button dec-button" onClick={removeFromCart}>
                                <i className="fas fa-minus-circle" />
                            </button>
                        </div>
                        <div className="cart-book-subtotal">
                            ${(booklist.price * quantity).toFixed(2)}
                        </div>
                </div>
            </ul>
        </div>
);
}

export default CartTable;

