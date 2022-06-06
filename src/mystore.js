import { createContext, useReducer, } from "react";


export const Store = createContext();

const initialState = {
    cart: {
        cartItems: localStorage.getItem('myCart') ? JSON.parse(localStorage.getItem('myCart')) : [],
    },
};

function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM': {
            const newItem = action.payload;
            const cartItems = [...state.cart.cartItems, newItem];
            localStorage.setItem('myCart', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter(item => item._id !== action.payload._id);
            localStorage.setItem('myCart', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        default: return state;
    };
};

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch }
    return <Store.Provider value={value}> {props.children}</Store.Provider>
}