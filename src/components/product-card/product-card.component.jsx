import {ProductCardContainer, Footer, Name, Price} from '../product-card/product-card.styles';
import Button, {BUTTON_TYPE_CLASSES} from '../../components/button/button.component'
import {useDispatch} from 'react-redux'
import { addItemToCart } from '../../store/cart/cart.action';
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

const ProductCard = ({product})=>{
    const dispatch= useDispatch();
    const cartItems= useSelector(selectCartItems);

    const addProductToCart= ()=> dispatch(addItemToCart(product, cartItems));

    const {name, imageUrl, price} = product;
    return(
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer className='footer'>
                <Name className='name'>{name}</Name>
                <Price className='price'>{price}</Price>
            </Footer>
            <Button onClick={addProductToCart} buttonType={BUTTON_TYPE_CLASSES.inverted}>Add to cart</Button>
        </ProductCardContainer>
    )
}

export default ProductCard;

