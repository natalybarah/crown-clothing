import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles.jsx';

import {useContext} from 'react';
import { CartContext } from '../../contexts/cart.context.jsx';

const CartIcon = () =>{
    const {setIsCartOpen, isOpen, cartCount}= useContext(CartContext)
    const toggleIsCartOpen = ()=> {setIsCartOpen(isOpen)}


    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}
export default CartIcon;
