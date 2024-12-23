import { createContext, useReducer } from 'react';
import { OrderDetails, ContextProps } from '../types';

type OrderDetailsState = {
    orderDetails: OrderDetails | null;
};

type OrderDetailsAction = 
    | { type: 'CLEAR' }
    | { type: 'UPDATE'; payload: OrderDetails };

const initialState: OrderDetailsState = {
    orderDetails: null
};

export const OrderDetailsStore = createContext<{
    orderDetails: OrderDetails | null;
    dispatch: React.Dispatch<OrderDetailsAction>;
}>({ orderDetails: null, dispatch: () => null });

const reducer = (state: OrderDetailsState, action: OrderDetailsAction): OrderDetailsState => {
    switch (action.type) {
        case 'CLEAR':
            return { orderDetails: null };
        case 'UPDATE':
            return { orderDetails: action.payload };
        default:
            return state;
    }
};

export const OrderDetailsContext = ({ children }: ContextProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <OrderDetailsStore.Provider value={{ ...state, dispatch }}>
            {children}
        </OrderDetailsStore.Provider>
    );
};
