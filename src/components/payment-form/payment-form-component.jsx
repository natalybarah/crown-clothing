import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import {BUTTON_TYPE_CLASSES} from "../button/button.component"
import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form-styles";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/select.user";
import { useState } from "react";

const PaymentForm= ()=>{
    const stripe= useStripe();
    const elements= useElements();
    const amount= useSelector(selectCartTotal);
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);
    const currentUser= useSelector(selectCurrentUser)
    const handleSubmit= async (event) =>{
        event.preventDefault();
        if (!stripe || !elements){
            return;
        }
    setIsPaymentLoading(true);

    const result= await fetch('/.netlify/functions/create-payment-intent ',
        {
            method: 'post',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({amount: amount * 100 })
        }
    )
    .then(resp=>resp.json())

    const {paymentIntent: {client_secret}}= result

    const confirmResult= await stripe.confirmCardPayment(
        client_secret,{
        payment_method:{
            card: elements.getElement(CardElement),
            billing_details:{
                name: currentUser ? currentUser.displayName : 'Guest'
            }
        }
    })

    setIsPaymentLoading(false);

    if(confirmResult.paymentIntent.status === 'succeeded'){
        alert('sucessful payment!!!')
    } else if (confirmResult.error){
        alert(confirmResult.error, 'there has been an error with your payment')
    }
    }
    
    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={handleSubmit}>
            <h2>Credit Card Information</h2>
            <CardElement/>
            <PaymentButton isLoading={isPaymentLoading} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm;
