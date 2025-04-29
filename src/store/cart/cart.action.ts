import { createAction, withMatcher, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../categories/categories.type";

const addCartItem= (productToAdd: CategoryItem, cartItems: CartItem[])=> {
    
    const existingCartItem= cartItems.find((cartItem)=> cartItem.id===productToAdd.id);
    
     if(existingCartItem){
         return cartItems.map((cartItem)=> cartItem.id===productToAdd.id 
         ? {...cartItem, quantity: cartItem.quantity + 1}
         : cartItem); }
     return [...cartItems, {...productToAdd, quantity: 1}];
 }

const removeCartItem = (cartItemToRemove: CartItem, cartItems: CartItem[]) => {
    const existingCartItem= cartItems.find((cartItem)=> cartItem.id===cartItemToRemove.id);
    if (existingCartItem && existingCartItem.quantity === 1){
        return cartItems.filter(cartItem=> cartItem.id !== cartItemToRemove.id)
    } return cartItems.map((cartItem)=> cartItem.id===cartItemToRemove.id
    
    ? {...cartItem, quantity: cartItem.quantity -1 } : cartItem
)}
 
const clearCartItem = (cartItemToClear: CartItem, cartItems: CartItem[]) => cartItems.filter((cartItem)=> cartItem.id !== cartItemToClear.id)
 
export const addItemToCart= (productToAdd: CartItem, cartItems: CartItem[])=> {
    const newCartItems= addCartItem(productToAdd, cartItems) 
    return setCartItems(newCartItems);
};

export type SetIsCartOpen= ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>
export const setIsCartOpen= withMatcher((boolean: boolean): SetIsCartOpen=> createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export type SetIsPopupOpen= ActionWithPayload<CART_ACTION_TYPES.SET_IS_POPUP_OPEN, boolean>
export const setIsPopupOpen= withMatcher((boolean: boolean): SetIsPopupOpen => createAction(CART_ACTION_TYPES.SET_IS_POPUP_OPEN, boolean));


export const removeItemFromCart= (cartItemToRemove: CartItem, cartItems: CartItem[])=> {
    const newCartItems=  removeCartItem(cartItemToRemove, cartItems);
    return setCartItems(newCartItems);
};

export const clearItemFromCart= (cartItemToClear: CartItem, cartItems: CartItem[])=> {
    const newCartItems= clearCartItem(cartItemToClear, cartItems);
    return setCartItems(newCartItems);
}

export type SetCartItems= ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>
export const setCartItems= withMatcher((cartItems: CartItem[]): SetCartItems=>{
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
});
