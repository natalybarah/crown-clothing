import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from '../checkout/checkout.styles';
import {useContext} from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
const {cartItems, cartTotal}= useContext(CartContext)

    return(
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Prince</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader> 
            {cartItems.map((item)=> (
                    <CheckoutItem key={item.id} item={item}/> 
                    ))
            }
            <Total>Total: ${cartTotal}</Total>
            

        </CheckoutContainer> 
        
    )
}

export default Checkout;
