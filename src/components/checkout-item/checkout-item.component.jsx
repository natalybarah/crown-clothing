import {CheckoutItemContainer, RemoveButton, ImageContainer, Name, Quantity, Price, Value, Arrow} from './checkout-item.styles.jsx';
import {useDispatch, useSelector} from 'react-redux';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem= ({item}) => {
    const cartItems= useSelector(selectCartItems);
    const dispatch= useDispatch();
    const {name, quantity, price, imageUrl} =item;

    const clearItemHandler= ()=> dispatch(clearItemFromCart(item, cartItems));
    
    const addItemToCartHandler= () => dispatch(addItemToCart(item, cartItems));
    
    const removeItemFromCartHandler = () => dispatch(removeItemFromCart(item, cartItems));

    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
                        <Name>{name}</Name>
                        <Quantity>
                            <Arrow onClick={removeItemFromCartHandler}>
                                &#10094;
                            </Arrow>
                            <Value>{quantity}</Value>
                            <Arrow  onClick={addItemToCartHandler}>
                                &#10095;
                            </Arrow>
                        </Quantity> 
                        <Price>{price}</Price>
                        <RemoveButton as='span' onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}
export default CheckoutItem;
