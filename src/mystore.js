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
        case 'CART_UPDATE_CURRENCY': {
            const inputs = action.payload;
            console.log(inputs)
            if (inputs.unit.short !== state.cart.cartItems[0]._source.currency_name) {
                for (const element of state.cart.cartItems) {
                    const converter = inputs.currency.filter(product => {
                        return product.short === element._source.currency_name
                    })
                    if (converter[0].divider > inputs.unit.divider) {
                        const figure = element._source.starting_from * converter[0].divider
                        element._source.starting_from = Math.floor(figure)
                    } else if (converter[0].divider < inputs.unit.divider) {
                        const figureMe = element._source.starting_from / inputs.unit.divider
                        element._source.starting_from = Math.floor(figureMe)
                    }
                }
                for (const item of state.cart.cartItems) {
                    item._source.currency_name = inputs.unit.short
                }
            }
            localStorage.setItem('myCart', JSON.stringify(state.cart.cartItems))
            return { ...state };
        }
        default: return state;
    };
};

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch }
    return <Store.Provider value={value}> {props.children}</Store.Provider>
}