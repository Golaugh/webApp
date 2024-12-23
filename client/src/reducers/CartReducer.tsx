import {ShoppingCartItem, BookItem} from "../types";

const cartKey = "carts";
export const initialCartState = JSON.parse(localStorage.getItem(cartKey) as string) || [];

export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR:'CLEAR'
};

type AppActions = {
    id:number;
    type: 'ADD' | 'REMOVE'  | 'CLEAR';
    book: BookItem;
}

const findItem = (array: any[], id: number) => array.find((item) => item.id == id);

export const cartReducer = (state:ShoppingCartItem[], action:AppActions) => {
    switch (action.type) {
        case CartTypes.ADD:
            if (findItem(state, action.id))
                return state.map((item) => item.id == action.id ? {...item, quantity:item.quantity+=1}:item)

            return [
                ...state,
                {id: action.id, book:action.book, quantity: 1 },
            ];
        // @ts-ignore
        case CartTypes.REMOVE:
            if (findItem(state, action.id))
                return state.map((item) => item.id === action.id ? {...item, quantity:item.quantity-=1}:item)
                    .filter((item) => item.quantity > 0);

        case CartTypes.CLEAR:
            return [];
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};
