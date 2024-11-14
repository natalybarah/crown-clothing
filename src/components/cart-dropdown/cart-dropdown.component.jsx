import Button from '../button/button.component';
import '../cart-dropdown/cart-dropdown.styles.scss';
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
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
          {  cartItems.map(item=> <CartItem key={item.id} cartItem={item}/>)
                }
            </div>
            <Button onClick={goToCheckoutHandler} buttonType='inverted'>Go to checkout</Button>
        </div>

    )
}

export default CartDropdown;
//if there are no items, I want to create a cart item, if the cart item already exists then I want to 
//increment the counter
