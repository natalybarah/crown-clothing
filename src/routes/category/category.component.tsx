import {CategoryTitle, CategoryContainer} from './category.styles';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categories.selector';
import ProductCard from '../../components/product-card/product-card.component';
import {useState, useEffect, Fragment} from 'react';
import {useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner.component';

const Category = () => {

    type CategoryRouteParams= {
        category: string
    }

    const {category} =useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap= useSelector(selectCategoriesMap);
    const isLoading= useSelector(selectCategoriesIsLoading);
    const [products, setProducts] =useState(categoriesMap[category]);

    useEffect(()=>{
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return(
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            { isLoading ? ( <Spinner/> ): ( 
                <CategoryContainer>
                    {products && 
                    products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </CategoryContainer>
            )}
        </Fragment>
    );
};
export default Category;
