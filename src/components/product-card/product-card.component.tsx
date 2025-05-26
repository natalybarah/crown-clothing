import { FC } from 'react';
import {ProductCardContainer, Footer, Name, Price} from './product-card.styles';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import {useDispatch} from 'react-redux'
import { addItemToCart } from '../../store/cart/cart.action';
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CategoryItem } from '../../store/categories/categories.type';

type ProductCardProps={
    product: CategoryItem
}
const ProductCard: FC<ProductCardProps> = ({product})=>{
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

