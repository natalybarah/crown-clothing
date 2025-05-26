import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles';
import { useSelector, useDispatch } from 'react-redux';
import {selectCartCount, selectIsCartOpen} from '../../store/cart/cart.selector';
import {setIsCartOpen} from '../../store/cart/cart.action'

const CartIcon = () =>{
    const dispatch= useDispatch()
    const cartCount= useSelector(selectCartCount);
    const isOpen= useSelector(selectIsCartOpen);

    const toggleIsCartOpen = ()=> dispatch(setIsCartOpen(!isOpen))
    
    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}
export default CartIcon;
