import {Outlet, Link} from 'react-router-dom';
import {Fragment, useContext} from 'react';
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import '../navigation/navigation.styles.scss'
import {UserContext} from '../../contexts/user.context'
import {signOutUser} from '../../utils/firebase/firebase.utils'



const Navigation= ()=>{
    /*  We remove the setCurrentUser and leave the currentUser because we need it below so that we know if the
        user is signed in, we can show the sign out option */
    const {currentUser}= useContext(UserContext);

    return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
            <CrownLogo className='logo'/>
        </Link>
        <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>SHOP</Link>
            { 
              currentUser ? (
                <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
              )
                : (<Link className='nav-link' to='/auth'>SIGN IN</Link>)
            }
          
        </div>
      </div>
      <Outlet/>
    </Fragment>
    )
  }

export default Navigation;
