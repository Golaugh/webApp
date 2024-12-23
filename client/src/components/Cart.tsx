import {Key, useContext} from "react";
import CartTable from "./CartTable";
import {ShoppingCartItem} from "../types";
import {CartStore} from "../contexts/CartContext";
import {Link} from "react-router-dom";

function Cart() {

    // @ts-ignore
    const {cart} = useContext<ShoppingCartItem[]>(CartStore);
    localStorage.setItem("carts", JSON.stringify(cart));
    // console.log(cart);

    const latestBookId = localStorage.getItem("latestBookId");
    // @ts-ignore
    let q = cart.length === 0 ? 0 : cart.reduce((sum, i) => sum + (i.book.price * i.quantity), 0);
    // console.log("The quantity is " + q);

    // @ts-ignore
    let numBook = cart.length === 0 ? 0 : cart.reduce((sum, i) => sum + i.quantity, 0);

    const  {dispatch} = useContext(CartStore);
    const clearCart = () => {
        dispatch({ id: cart.bookId, type: "CLEAR", book: cart.book });
    };

    let numState;
    if (numBook <= 1) {numState = "book"} else {numState = "books"};

    let emptyDetect;
    let finalState;
    let emptyTable;
    let emptyBook;
    let emptyPrice;
    let emptySubtotal;
    if (numBook === 0) {
        emptyDetect="emptyState";
        finalState=(
            <div className="total-amount">
                The cart is empty!
                <p className="empty-continue">
                    <Link to={`/categories/${latestBookId}`}>Continue Shopping!</Link>
                </p>
            </div>
        );
        emptyTable="empty";
        emptyBook="";
        emptyPrice="";
        emptySubtotal="";
    } else { // @ts-ignore
        emptyDetect="";
        finalState=`The total amount is ${q.toFixed(2)}.`;
        emptyTable="table-heading";
        emptyBook="Book";
        emptyPrice="Price / Quantity";
        emptySubtotal="Amount";
    }


    return (
        <div>
            <div className="upper-part">
                <nav className="category-nav">
                    <h3>Cart Page</h3>

                    <ul className="category-tab">
                        <li className={emptyDetect}><Link to={'/checkout'}>Checkout ({numBook} {numState})</Link></li>
                        <li ><Link to={`/categories/${latestBookId}`}>Continue shopping</Link></li>
                        <li className={emptyDetect} onClick={clearCart}>Clear the cart</li>
                    </ul>
                </nav>

                <div className="cart-table">
                <ul className="cart2">
                        <li className={emptyTable}>
                            <div className="heading-book">{emptyBook}</div>
                            <div className="heading-price">{emptyPrice}</div>
                            <div className="heading-subtotal">{emptySubtotal}</div>
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                {cart.map((item: ShoppingCartItem, id: Key) => (
                    <CartTable booklist={item.book} key={id} quantity={item.quantity}/>
                ))}
            </div>

            <div className="total-amount">
                <h2>{finalState}</h2>
            </div>
        </div>
    )
}

export default Cart;