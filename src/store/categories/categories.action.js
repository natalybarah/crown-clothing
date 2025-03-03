import { createAction } from "../../utils/reducer/reducer.utils"
import { CATEGORIES_ACTION_TYPES } from "./categories.type"

export const fetchCategoriesStart= () => createAction(CATEGORIES_ACTION_TYPES.FECTH_CATEGORIES_START);

export const fetchCategoriesSucess= (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCESS, categoriesArray);

export const fetchCategoriesFailed= (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)

/*
    When working with redux thunk:
    export const fetchCategoriesAsync = () => async (dispatch)=> {
        dispatch(fetchCategoriesStart());
        try{
            const categoriesArray= await getCategoriesAndDocuments('categories');
            dispatch(fetchCategoriesSucess(categoriesArray));

        } catch (error) {
            dispatch(fetchCategoriesFailed(error))
        }
    } 
*/