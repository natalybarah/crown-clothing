import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";
import { RootState } from "../store";

const selectCartReducer= (state: RootState): CartState=> state.cart;

export const selectCartItems= createSelector(
    [selectCartReducer],
    (cartReducer)=> cartReducer.cartItems
)

export const selectCartCount= createSelector(
    [selectCartItems],
    (cartItems)=> cartItems.reduce((accum, item)=>{ return accum + item.quantity}, 0)   
)
  
export const selectCartTotal= createSelector(
    [selectCartItems],
    (cartItems)=> cartItems.reduce((accum, item)=>{ return accum + item.quantity * item.price},0)
)

export const selectIsCartOpen =createSelector(
    [selectCartReducer],
    (cartReducer)=> cartReducer.isOpen
)

export const selectIsPopupOpen= createSelector(
    [selectCartReducer],
    (cartReducer) => cartReducer.isPopupOpen
)


