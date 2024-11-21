import styled from "styled-components";
import { BaseButton, GoogleSignInButton, InvertedButton } from "../button/button.styles";

export const CartDropdownContainer= styled.div`
    position: absolute; 
    width: 240px; 
    height: 340px; 
    display: flex; 
    flex-direction: column; 
    padding: 20px; 
    border: 1px solid black; 
    background-color: white; 
    top: 90px; 
    right: 40px; 
    z-index: 5; 

    ${BaseButton}, ${InvertedButton}, ${GoogleSignInButton}{
        margin-top: auto;
        white-space: nowrap;
    }
` 
export const EmptyMessage= styled.span`
    font-size: 18px; 
    margin: 50px auto; 
`
export const CartItemsStyles= styled.div`
    height: 240px; 
    display: flex; 
    flex-direction: column; 
    overflow: scroll; 
    
    /* Hide scrollbar for WebKit browsers */
    &::-webkit-scrollbar {
        display: none; /* Hide scrollbar */
    }

    /* Hide scrollbar for Firefox */
    scrollbar-width: none; /* Firefox */
    
    /* For other browsers */
    -ms-overflow-style: none; /* Internet Explorer and Edge */
`


