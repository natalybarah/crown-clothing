import Button from '../button/button.component';
import {CartDropdownContainer, CartItemsStyles, EmptyMessage} from '../cart-dropdown/cart-dropdown.styles';
import CartItem from '../cart-item/cart-item.component';
import {useContext} from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate} from 'react-router-dom';

const CartDropdown = () =>{
    const navigate = useNavigate();

    const goToCheckoutHandler= () =>{
        navigate('/checkout')
    }
    const {cartItems}= useContext(CartContext);    
    
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

