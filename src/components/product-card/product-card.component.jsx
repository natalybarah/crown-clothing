import '../product-card/product-card.styles.scss';
import Button from '../../components/button/button.component'
import { CartContext } from '../../contexts/cart.context';
import {useContext} from 'react';


const ProductCard = ({product})=>{
    const addProductToCart= ()=> addItemToCart(product);
    
    const {addItemToCart} = useContext(CartContext);

    const {name, imageUrl, price} = product;
    return(
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button onClick={addProductToCart} buttonType='inverted'>Add to cart</Button>
        </div>
    )
}

export default ProductCard;

