import styled from 'styled-components';
import Button from '../../components/button/button.component';

export const CheckoutContainer= styled.div`
    width: 55%;
    min-height: 90vh; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    margin:  0 auto;
   //background-color: red;

   @media screen and (max-width: 800px) {
    width: 95%;
    margin-top: 20px;
  }
`
export const CheckoutHeader= styled.div`
    width: 100%; 
    padding: 10px 0;
    display: flex; 
    justify-content: center; 
    border-bottom: 1px solid darkgrey; 
    box-sizing: border-box;

    @media screen and (max-width: 400px) {
    font-size: 12px; 
    }


`
export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%; 
  text-align: center;

 
  &:first-child {
    text-align: left;
  }
   
  &:last-child {
    width: 8%;
    text-align: right;
  }

  @media screen and (max-width: 800px) {
    width: 22%; 
    &:last-child {
      width: 12%; 
    }
  }
`

export const Total= styled.span`
    margin-top: 30px; 
    margin-left: auto; 
    text-align: center;
    font-size: 36px;
`
export const ContinueButton= styled(Button)`
    margin-left: auto;
    margin-top: 50px;
    background-color: #2E8B57;
`
