import {createContext, Dispatch, ReactNode, useReducer} from "react";
import {cartReducer, initialCartState,} from "../reducers/CartReducer";
import { ShoppingCartItem} from "../types";

export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null
});

CartStore.displayName = 'CartContext';

// the rest of the code comes here
interface CartContextProps {
    children: ReactNode;
}

function CartContext({children}: CartContextProps) {

    // @ts-ignore
    const [cart, dispatch] = useReducer(cartReducer, initialCartState);
    localStorage.setItem("cart", JSON.stringify(cart));

    return (
        <CartStore.Provider value={{ cart, dispatch }}>
            {children}
        </CartStore.Provider>
    );
}
export default CartContext;