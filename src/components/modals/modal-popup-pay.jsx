import { PayPopupContainer, PayPopupOptions } from "./modal-popup-pay.styles";
import { NavLinkPopup } from "./modal-popup-pay.styles";
import { useRef, useCallback} from "react";
import useClickOutsideHook from "../../hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { setIsPopupOpen } from "../../store/cart/cart.action";
import { selectIsPopupOpen } from "../../store/cart/cart.selector";

const ModalPopupPay= () => {

    const payHowRef= useRef(null);
    const dispatch= useDispatch();
    const isPopupOpen= useSelector(selectIsPopupOpen)
    
    const onRedirectionClick= useCallback(()=>{
        dispatch(setIsPopupOpen(false))
    }, [dispatch])

    useClickOutsideHook(payHowRef, ()=>{dispatch(setIsPopupOpen(false))})
    return(
    
            <PayPopupContainer ref={payHowRef} isPopupOpen={isPopupOpen}>
            <h3>How do you want to complete your purchase?</h3>
                <PayPopupOptions>
                    <NavLinkPopup onClick={onRedirectionClick} to='/auth'>Join now</NavLinkPopup>
                    <NavLinkPopup onClick={onRedirectionClick} to='/auth'>Sign in</NavLinkPopup>
                </PayPopupOptions>
            </PayPopupContainer>
    )
}

export default ModalPopupPay;