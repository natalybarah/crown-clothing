import Button from '../button/button.component';
import { useCallback } from 'react';
import {CartDropdownContainer, CartItemsStyles, EmptyMessage} from '../cart-dropdown/cart-dropdown.styles';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {selectCartItems} from '../../store/cart/cart.selector'

const CartDropdown = () =>{
    const navigate = useNavigate();

    const goToCheckoutHandler= useCallback(() =>{
        navigate('/checkout')
    }, [])
    const cartItems= useSelector(selectCartItems);    
    
    return(
        <CartDropdownContainer className='cart-dropdown-container'>
            <CartItemsStyles className='cart-items'>
                {cartItems.length ? 
                (cartItems.map(item=> <CartItem key={item.id} cartItem={item}/>)) 
                : (<EmptyMessage>Your cart is empty</EmptyMessage>)}
            </CartItemsStyles>
            <Button onClick={goToCheckoutHandler} >Go to checkout</Button>
        </CartDropdownContainer>

    )
}

export default CartDropdown;

