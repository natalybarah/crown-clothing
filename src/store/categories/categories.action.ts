import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils"
import { CATEGORIES_ACTION_TYPES } from "./categories.type"
import {Category} from './categories.type';



export type CategoryAction= FetchCategoriesStart | FetchCategoriesSucess | FetchCategoriesFailed;

export type FetchCategoriesStart= Action<CATEGORIES_ACTION_TYPES.FECTH_CATEGORIES_START>
export const fetchCategoriesStart= withMatcher((): FetchCategoriesStart=> createAction(CATEGORIES_ACTION_TYPES.FECTH_CATEGORIES_START));


export type FetchCategoriesSucess= ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCESS, Category[]>

export const fetchCategoriesSucess= withMatcher((categoriesArray: Category[]): FetchCategoriesSucess => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCESS, categoriesArray));

export type FetchCategoriesFailed= ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>
export const fetchCategoriesFailed= withMatcher((error: Error): FetchCategoriesFailed => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));

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

export type Alien= {
    fly: ()=> {}
}

export type Human= {
    speak: ()=> {}
}

export const isHuman= (entity: Human | Alien): entity is Human=>{
    return (entity as Human).speak !== undefined 
}