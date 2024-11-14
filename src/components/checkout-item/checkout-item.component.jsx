import '../checkout-item/checkout-item.styles.scss';
import {useContext} from 'react'
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem= ({item}) => {
    const {name, quantity, price, imageUrl} =item;

    const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext);
    const clearItemHandler= ()=>clearItemFromCart(item);
    const addItemToCartHandler= () =>addItemToCart(item);
    const removeItemFromCartHandler = () => removeItemFromCart(item)

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
                        <span className='name'>{name}</span>
                        <span className='quantity'>
                            <div  onClick={removeItemFromCartHandler} className='arrow'>
                                &#10094;
                            </div>
                            <span className='value'>{quantity}</span>
                            <div onClick={addItemToCartHandler} className='arrow'>
                                &#10095;
                            </div>
                            </span> 
                        <span className='price'>{price}</span>
                        <span onClick={clearItemHandler} className='remove-button'>&#10005;</span>
                    
        </div>
    )
}
export default CheckoutItem;
