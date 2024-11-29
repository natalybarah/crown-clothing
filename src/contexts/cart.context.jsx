import {createContext, useReducer} from 'react';
import {createAction} from '../utils/reducer/reducer.utils'

const addCartItem= (productToAdd, cartItems)=>{
    
   const existingCartItem= cartItems.find((cartItem)=> cartItem.id===productToAdd.id);
   
    if(existingCartItem){
        return cartItems.map((cartItem)=> cartItem.id===productToAdd.id 
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    );
    
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
  
}

const removeCartItem = (cartItemToRemove, cartItems) => {
   const existingCartItem= cartItems.find((cartItem)=> cartItem.id===cartItemToRemove.id);
   //check if item is equal to 1, if it is then remove item from cart
    if (existingCartItem.quantity === 1){
       return cartItems.filter(cartItem=> cartItem.id !== cartItemToRemove.id)
    } return cartItems.map((cartItem)=> cartItem.id===cartItemToRemove.id
    
    ? {...cartItem, quantity: cartItem.quantity -1 }
    : cartItem

)}

const clearCartItem = (cartItemToClear, cartItems) => cartItems.filter((cartItem)=> cartItem.id !== cartItemToClear.id)

export const CartContext = createContext({
    isOpen: false, 
    cartItems: [],
    addItemToCart: ()=>{},
    setCartItems: ()=>{},
    cartCount: 0,
    setCartCount: () =>{},
    removeItemFromCart: ()=>{},
    clearItemFromCart: () => {},
    cartTotal: 0,
    setCartTotal: () => {}


})
/*export const CART_ACTION_TYPES={
    TOGGLE_CART_IS_OPEN: 'TOGGLE_CART_IS_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    CART_TOTAL: 'SET_CART_TOTAL',
    ADD_ITEM: 'ADD_ITEM'
}*/
const CART_ACTION_TYPES={
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}
const cartReducer= (state, action)=>{
    const {type, payload}= action
    console.log(payload, ' i am paylod')
    console.log('isOpenReducer dispatched')
        switch(type){
            case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state, //I want to update state with the payload
                ...payload
            }
           case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isOpen: payload
            }
            default: 
                throw Error(`An error type ${type} was encountered in IsOpenReducer`)
    }
}

const INITIAL_VALUE= {
    isOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal:0, 
}



export const CartContextProvider= ({children})=>{
  //  const   [isOpen, setIsOpen] = useState(false);
   // const [{isOpen}, dispatch]= useReducer(cartReducer,INITIAL_VALUE);
    const[{cartItems, isOpen, cartCount, cartTotal}, dispatch]= useReducer(cartReducer, INITIAL_VALUE );


const updateCartItemsReducer= (newCartItems)=>{

    const newCartCount= newCartItems.reduce((accum, item)=>{ return accum + item.quantity}, 0);  
    const newCartTotal = newCartItems.reduce((accum, item)=>{ return accum + item.quantity * item.price},0);

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartCount: newCartCount,
        cartTotal: newCartTotal,
        cartItems: newCartItems
        }))
}
const setIsCartOpen= ()=>{
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, !isOpen))
}
const addItemToCart= (productToAdd)=>{
    const newCartItems= addCartItem(productToAdd, cartItems)
    updateCartItemsReducer(newCartItems)
}
const removeItemFromCart= (cartItemToRemove)=>{
    const newCartItems=  removeCartItem(cartItemToRemove, cartItems);
    updateCartItemsReducer(newCartItems)
}
const clearItemFromCart= (cartItemToClear)=>{
    const newCartItems= clearCartItem(cartItemToClear, cartItems)
    updateCartItemsReducer(newCartItems)
}


    const value= {isOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, clearItemFromCart, removeItemFromCart, cartTotal}
//we receive the product to add, we need to decide if we are going to make a new cart item if the cartItems is empty from any of the producttoadd
//or do I find the existing cart item for this product and then just increase the quantity by one
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
