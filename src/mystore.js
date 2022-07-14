import { createContext, useReducer, } from "react";


export const Store = createContext();

const initialState = {
    favorites: localStorage.getItem('favor') ? JSON.parse(localStorage.getItem('favor')) : [],
    items:  [],
    currency: [],
    name :null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_FAVORITES': {
            const newItem = action.payload;
            const existItem = state.favorites.find((item) => item._source.profile_id === newItem._source.profile_id);
            const cartItems = existItem ? state.favorites.filter(item => item._source.profile_id !== existItem._source.profile_id) : [...state.favorites, newItem];
            localStorage.setItem('favor', JSON.stringify(cartItems))
            return { ...state, favorites: cartItems };
        }
        case 'ADD_ITEMS': {
            const newItem = action.payload;
            return { ...state, items: newItem };
        }
        case 'ADD_NAME': {
            const newItem = action.payload;
            return { ...state, name: newItem };
        }
        case 'ADD_CURRENCY': {
            const newItem = action.payload;
            return { ...state, currency: newItem };
        }
        case  'UPDATE_CURRENCY' : {
            const unit = action.payload;
            if (unit.unit.short !== state.items[0]._source.currency_name) {
                for (const element of state.items) {
                    const converter = state.currency.filter(product => {
                        return product.short === element._source.currency_name
                    })
                    if (converter[0].divider > unit.unit.divider) {
                        const figure = element._source.starting_from * converter[0].divider
                        element._source.starting_from = Math.floor(figure)
                    } else if (converter[0].divider < unit.unit.divider) {
                        const figureMe = element._source.starting_from / unit.unit.divider
                        element._source.starting_from = Math.floor(figureMe)
                    }
                }
                for (const item of state.items) {
                    item._source.currency_name = unit.unit.short
                }
            localStorage.setItem('items', JSON.stringify(state.items))
        }
            return {...state};
        }
        case 'CART_UPDATE_CURRENCY': {
            const unit = action.payload;
            if (state.favorites.length > 0){
                if (unit.unit.short !== state.favorites[0]._source.currency_name) {
                    for (const element of state.favorites) {
                        const converter = state.currency.filter(product => {
                            return product.short === element._source.currency_name
                        })
                        if (converter[0].divider > unit.unit.divider) {
                            const figure = element._source.starting_from * converter[0].divider
                            element._source.starting_from = Math.floor(figure)
                        } else if (converter[0].divider < unit.unit.divider) {
                            const figureMe = element._source.starting_from / unit.unit.divider
                            element._source.starting_from = Math.floor(figureMe)
                        }
                    }
                    for (const item of state.favorites) {
                        item._source.currency_name = unit.unit.short
                    }
                localStorage.setItem('favor', JSON.stringify(state.favorites))
            }
        }
            return {...state};
        }
        default: return state;
    };
};

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch }
    return <Store.Provider value={value}> {props.children}</Store.Provider>
}