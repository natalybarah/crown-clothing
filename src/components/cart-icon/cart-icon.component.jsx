import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles.jsx';

import {useContext} from 'react';
import { CartContext } from '../../contexts/cart.context.jsx';

const CartIcon = () =>{
    const {setIsOpen, isOpen, cartCount}= useContext(CartContext)
    const toggleIsCartOpen = ()=>setIsOpen(!isOpen)

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}
export default CartIcon;
