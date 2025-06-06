
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';

export const NavigationContainer= styled.div`
    height: 70px; 
    width: 100%; 
    display: flex; 
    justify-content: space-between; 
    margin-bottom: 25px; 

    @media screen and (max-width: 800px){
      height: 60px;
      padding: 10px 20px;
      margin-bottom: 20px;
    
    }
`
export const LogoContainer= styled(Link)`
    height: 100%; 
    width: 70px; 
    padding: 25px; 

    @media screen and (max-width: 800px){
      width: 50px;
      padding: 0px;
    }
`
export const NavLinks= styled.div`
    width: 50%; 
    height: 100%; 
    display: flex; 
    align-items: center; 
    justify-content: flex-end; 

    @media and (max-width: 800px){
      width: 80%
    }
`
const navLinkStyles = css`
  padding: 10px 15px;
  cursor: pointer;
`;

export const NavLink = styled(Link)`
  ${navLinkStyles}
`;

export const NavLinkSpan = styled.span`
  ${navLinkStyles}
`;