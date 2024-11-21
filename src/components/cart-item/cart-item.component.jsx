import {CartItemContainer, ItemDetails, Name} from '../cart-item/cart-item.styles'

const CartItem = ({cartItem}) =>{
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
}

export default CartItem;