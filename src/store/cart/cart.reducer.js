import { CART_ACTION_TYPES } from "./cart.types"

const INITIAL_VALUE= {
    isOpen: false,
    isPopupOpen: false,
    cartItems: [],
}

export const cartReducer= (state=INITIAL_VALUE, action)=> {
    const {type, payload}= action
   
        switch(type){
            case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state, 
                cartItems: payload
            }
           case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isOpen: payload
            }
            case CART_ACTION_TYPES.SET_IS_POPUP_OPEN:
                return{
                    ...state,
                    isPopupOpen: payload
                }
            default: 
                return state;
    }
};



