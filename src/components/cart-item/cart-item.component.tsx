
import { FC, memo } from 'react';
import {CartItemContainer, ItemDetails, Name} from './cart-item.styles';
import { CartItem as TCartItem} from '../../store/cart/cart.types';

type CartItemProps={
    cartItem: TCartItem
}
const CartItem: FC<CartItemProps> = memo(({cartItem}) =>{
    const {name, quantity, price, imageUrl} = cartItem

    return(
        <CartItemContainer>
            <img src={imageUrl} alt={imageUrl}/>
            <ItemDetails>
                <Name as='span'>{name}</Name>
                <span>{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
})

export default CartItem; 