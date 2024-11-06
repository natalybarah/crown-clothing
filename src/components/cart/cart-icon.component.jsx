import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import '../cart/cart-icon.styles.scss';

import {useContext} from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () =>{

    const {setIsOpen, isOpen}= useContext(CartContext)
/*const [isOpen, setOpen] = useState(false)
const [itemCount, setCount] = useState(0);

const countIncrementer = () =>{
    setCount(start => start + 1)
}

    const cartHandler = ()=>{
        setOpen(prevState=> ! prevState)

    }*/
    const toggleIsCartOpen = ()=>setIsOpen(!isOpen)

return(
    <div onClick={toggleIsCartOpen} className='cart-icon-container'>
         <ShoppingIcon className='shopping-icon'/>
       
         <span /*onClick={countIncrementer} */className='item-count'>0</span>
         {/*setCount >0 && <span>You have added items in your cart!</span>*/}

    </div>
   
)
}

export default CartIcon;
