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
    
export const CartContext = createContext({
    isOpen: false,
    setIsOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    setCartItems: ()=>{},
    cartCount: 0,
    setCartCount: () =>{}

})


export const CartContextProvider= ({children})=>{
    const   [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems]=useState([]);
    const [cartCount, setCartCount] = useState(0);

    const addItemToCart= (productToAdd)=>{
        setCartItems(addCartItem(productToAdd, cartItems))
    }

    useEffect(()=>{
       const newCartCount= cartItems.reduce((accum, item)=>{ return accum + item.quantity}, 0);
       setCartCount(newCartCount);
    }, [cartItems])

    const value= {isOpen, setIsOpen, cartItems, addItemToCart, cartCount, setCartCount}
//we receive the product to add, we need to decide if we are going to make a new cart item if the cartItems is empty from any of the producttoadd
//or do I find the existing cart item for this product and then just increase the quantity by one
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
