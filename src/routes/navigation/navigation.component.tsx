import {Outlet} from 'react-router-dom';
import {Fragment} from 'react';
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import { signOutStart } from '../../store/user/user.action';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import {NavigationContainer, NavLinks, NavLink, NavLinkSpan, LogoContainer} from './navigation.styles';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/select.user';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import {useDispatch} from 'react-redux';

const Navigation= () =>{

  const dispatch= useDispatch()
  const currentUser= useSelector(selectCurrentUser)
  const isOpen = useSelector(selectIsCartOpen)
  
  const signOutHandler= ()=>{
    dispatch(signOutStart())
   }
  
 
    return (
      <Fragment>
        <NavigationContainer >
          <LogoContainer  to='/'>
              <CrownLogo/>
          </LogoContainer>
          <NavLinks>
              <NavLink to='/shop'>SHOP</NavLink>
              { 
                currentUser ? (
                 <NavLinkSpan  onClick={signOutHandler}>SIGN OUT</NavLinkSpan>
                )
                  : (<NavLink  to='/auth'>SIGN IN</NavLink>)
              } 
              <CartIcon /> 
              { isOpen && <CartDropdown/> }
          </NavLinks>
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }

export default Navigation;
