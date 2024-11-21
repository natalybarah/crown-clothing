import {ProductCardContainer, Footer, Name, Price} from '../product-card/product-card.styles';
import Button, {BUTTON_TYPE_CLASSES} from '../../components/button/button.component'
import { CartContext } from '../../contexts/cart.context';
import {useContext} from 'react';


const ProductCard = ({product})=>{
    const addProductToCart= ()=> addItemToCart(product);
    const {addItemToCart} = useContext(CartContext);
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

