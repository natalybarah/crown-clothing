import { Category } from "./categories.type";
import {fetchCategoriesStart, fetchCategoriesFailed, fetchCategoriesSucess, } from "./categories.action";
import { AnyAction } from "redux";

export type CategoriesState={
    readonly categories: Category[],
    readonly isLoading: boolean,
    readonly error: null | Error,
}
export const CATEGORIES_INITIAL_STATE: CategoriesState={
    categories: [],
    isLoading: false,
    error: null,
}

export const categoriesReducer= (state= CATEGORIES_INITIAL_STATE, action ={} as AnyAction): CategoriesState=>{

    if(fetchCategoriesStart.match(action)){
        return {...state, isLoading: true}
    }
    if(fetchCategoriesSucess.match(action)){
        return {...state, categories: action.payload, isLoading: false}
    }
    if(fetchCategoriesFailed.match(action)){
        return {...state, error: action.payload, isLoading: false}
    }
    return state;
    
}

