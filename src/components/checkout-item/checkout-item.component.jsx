import {CheckoutItemContainer, RemoveButton, ImageContainer, Name, Quantity, Price, Value, Arrow} from './checkout-item.styles.jsx';
import {useContext} from 'react'
import { CartContext } from '../../contexts/cart.context.jsx';

const CheckoutItem= ({item}) => {
    const {name, quantity, price, imageUrl} =item;

    const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext);
    const clearItemHandler= ()=>clearItemFromCart(item);
    const addItemToCartHandler= () =>addItemToCart(item);
    const removeItemFromCartHandler = () => removeItemFromCart(item)

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
