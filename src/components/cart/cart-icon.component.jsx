import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import '../cart/cart-icon.styles.scss';

import {useContext} from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () =>{
    const {setIsOpen, isOpen, cartCount}= useContext(CartContext)
    const toggleIsCartOpen = ()=>setIsOpen(!isOpen)

    return(
        <div onClick={toggleIsCartOpen} className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon'/>
        
            <span  className='item-count'>{cartCount}</span>
            {/*setCount >0 && <span>You have added items in your cart!</span>*/}

        </div>
    )
}

export default CartIcon;
