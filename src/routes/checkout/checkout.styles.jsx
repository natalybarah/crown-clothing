import styled from 'styled-components';
import Button from '../../components/button/button.component';

export const CheckoutContainer= styled.div`
    width: 55%; 
    min-height: 90vh; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    margin: 50px auto 0;
   // background-color: white;
`
export const CheckoutHeader= styled.div`
    width: 100%; 
    padding: 10px 0; 
    display: flex; 
    justify-content: space-between; 
    border-bottom: 1px solid darkgrey; 
`
export const HeaderBlock= styled.div`
    text-transform: capitalize; 
    width: 23%; 
    &:last-child  { 
        width: 8%; 
    } 
`
export const Total= styled.span`
    margin-top: 30px; 
    margin-left: auto; 
    font-size: 36px;
`
export const ContinueButton= styled(Button)`
    margin-left: auto;
    margin-top: 50px;
    background-color: #2E8B57;
`
