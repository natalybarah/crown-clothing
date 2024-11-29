import {Outlet} from 'react-router-dom';
import {Fragment, useContext} from 'react';
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import {UserContext} from '../../contexts/user.context'
import {signOutUser} from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';
import {NavigationContainer, NavLinks, NavLink, LogoContainer} from '../navigation/navigation.styles';

const Navigation= () =>{
    /*  We remove the setCurrentUser and leave the currentUser because we need it below so that we know if the
        user is signed in, we can show the sign out option */
    const {currentUser}= useContext(UserContext);
    const {isOpen} = useContext(CartContext)

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
                <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
              )
                : (<NavLink  to='/auth'>SIGN IN</NavLink>)
            } 
            <CartIcon /> 
            {isOpen && <CartDropdown/>
            }

        </NavLinks>
        
      </NavigationContainer>
     
      <Outlet/>
    </Fragment>
    )
  }

export default Navigation;
