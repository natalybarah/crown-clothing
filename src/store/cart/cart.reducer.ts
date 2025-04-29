import { CartItem } from "./cart.types";
import { setIsCartOpen, setIsPopupOpen, setCartItems } from "./cart.action";
import { AnyAction } from "redux";

const INITIAL_VALUE= {
    isOpen: false,
    isPopupOpen: false,
    cartItems: [],
}
export type CartState={
    readonly isOpen: boolean,
    readonly isPopupOpen: boolean,
    readonly cartItems: CartItem[]
}

export const cartReducer= (state=INITIAL_VALUE as CartState, action: AnyAction)=> {
    
    if(setCartItems.match(action)){
        return{
            ...state, 
            cartItems: action.payload
        }
    }
    if(setIsCartOpen.match(action)){
        return{
            ...state,
            isOpen: action.payload
        }
    }
    if(setIsPopupOpen.match(action)){
        return{
            ...state,
            isPopupOpen: action.payload
        }
    }
    
    return state;
    
};



