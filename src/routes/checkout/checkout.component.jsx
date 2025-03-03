import { useDispatch, useSelector } from 'react-redux';
import { setIsPopupOpen } from '../../store/cart/cart.action';
import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total, ContinueButton} from '../checkout/checkout.styles';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import {selectCartItems, selectCartTotal, selectIsPopupOpen} from '../../store/cart/cart.selector'
import { selectCurrentUser } from '../../store/user/select.user';
import PaymentForm from '../../components/payment-form/payment-form-component';
import {BUTTON_TYPE_CLASSES} from '../../components/button/button.component';
import Modal from '../../components/modals/modal-mask.component';

const Checkout = () => {
    const dispatch= useDispatch()
    const cartItems= useSelector(selectCartItems)
    const cartTotal= useSelector(selectCartTotal);
    const currentUser= useSelector(selectCurrentUser);
    const isPopupOpen= useSelector(selectIsPopupOpen);
    const popupHandler= ()=>{
        dispatch(setIsPopupOpen(!isPopupOpen))
    }
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
                <Total>Total: ${cartTotal} </Total>
                { currentUser ? <PaymentForm></PaymentForm> : <ContinueButton  onClick={popupHandler} buttonType={BUTTON_TYPE_CLASSES.base}>Continue</ContinueButton> }
                {isPopupOpen && <Modal/>   }
            </CheckoutContainer> 
    )
}
export default Checkout;
