import {useContext} from 'react';
import {ProductsContext} from '../../contexts/products.context';
import ProductCard from '../../components/product-card/product-card.component';
import '../shop/shop.styles.scss';


const Shop = () =>{
    //the purpose of this was to bring the products and not from the json doc, but from a context
    const {products}= useContext(ProductsContext);

    return(
        <div className='products-container'>
            {products.map((product)=> (
                 <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}

export default Shop;
