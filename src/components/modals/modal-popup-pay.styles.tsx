import styled, {keyframes} from "styled-components";
import { NavLink } from "../../routes/navigation/navigation.styles";

const riseAnimation= keyframes`
    0% {
        transform: translateX(-50%) translateY(100%);
    }
    100% {
        transform: translateX(-50%) translateY(0%);
    }

`
type PayPopupContainerProps={
    isPopUpOpen: boolean
}
export const PayPopupContainer = styled.div<PayPopupContainerProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    width: 100%;
    padding: 20px;
    max-width: 600px;
    height: auto;
    min-height: 300px;
    max-height: 70%;
    border-style: none;
    border-width: 5px;
    background: white;
    background-color: white;
    bottom: 0;
    position: fixed;
    left: 50%;
    transform: translateX(-50%) translateY(0%); /* Always start at the final position */
    border-radius: 20px 20px 0 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    overflow: hidden;
    animation: ${riseAnimation} 0.5s ease-in-out;
    h1 {
        font-size: 26px;
        color: black;
    };

     h3{
        padding-left: 15px;
        };
`;

export const PayPopupOptions= styled.div`
    color: grey;
    display: flex;
    flex-direction: column;
    width: 120px;
`
export const NavLinkPopup= styled(NavLink)`
    color: black;
    font-size: 20px;
    &:hover {
        color: #2E8B57;
    }
`