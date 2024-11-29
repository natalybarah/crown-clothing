
import {useState,useEffect, createContext} from 'react';


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
    setIsOpen: ()=>{},
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


export const CartContextProvider= ({children})=>{
    const   [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems]=useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart= (productToAdd)=>{
        setCartItems(addCartItem(productToAdd, cartItems))
    }
    const removeItemFromCart= (cartItemToRemove)=>{
        setCartItems(removeCartItem(cartItemToRemove, cartItems))
    }
    const clearItemFromCart= (cartItemToClear)=>{
        setCartItems(clearCartItem(cartItemToClear, cartItems))
    }

    useEffect(()=>{
       const newCartCount= cartItems.reduce((accum, item)=>{ return accum + item.quantity}, 0);
       setCartCount(newCartCount);
    }, [cartItems])
    
    useEffect(()=>{
        const calculateTotal = cartItems.reduce((accum, item)=>{ return accum + item.quantity * item.price},0);
        setCartTotal(calculateTotal)
        }, [cartItems]
    )

    const value= {isOpen, setIsOpen, cartItems, addItemToCart, cartCount, clearItemFromCart, removeItemFromCart, cartTotal}
//we receive the product to add, we need to decide if we are going to make a new cart item if the cartItems is empty from any of the producttoadd
//or do I find the existing cart item for this product and then just increase the quantity by one
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
