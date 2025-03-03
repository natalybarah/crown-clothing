import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem= (productToAdd, cartItems)=> {
    
    const existingCartItem= cartItems.find((cartItem)=> cartItem.id===productToAdd.id);
    
     if(existingCartItem){
         return cartItems.map((cartItem)=> cartItem.id===productToAdd.id 
         ? {...cartItem, quantity: cartItem.quantity + 1}
         : cartItem); }
     return [...cartItems, {...productToAdd, quantity: 1}];
 }

const removeCartItem = (cartItemToRemove, cartItems) => {
    const existingCartItem= cartItems.find((cartItem)=> cartItem.id===cartItemToRemove.id);
    if (existingCartItem.quantity === 1){
        return cartItems.filter(cartItem=> cartItem.id !== cartItemToRemove.id)
    } return cartItems.map((cartItem)=> cartItem.id===cartItemToRemove.id
    
    ? {...cartItem, quantity: cartItem.quantity -1 } : cartItem
)}
 
const clearCartItem = (cartItemToClear, cartItems) => cartItems.filter((cartItem)=> cartItem.id !== cartItemToClear.id)
 
export const addItemToCart= (productToAdd, cartItems)=> {
    const newCartItems= addCartItem(productToAdd, cartItems) 
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const setIsCartOpen= (boolean)=> createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
export const setIsPopupOpen= (boolean) => createAction(CART_ACTION_TYPES.SET_IS_POPUP_OPEN, boolean);

export const removeItemFromCart= (cartItemToRemove, cartItems)=> {
    const newCartItems=  removeCartItem(cartItemToRemove, cartItems);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart= (cartItemToClear, cartItems)=> {
    const newCartItems= clearCartItem(cartItemToClear, cartItems);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}
