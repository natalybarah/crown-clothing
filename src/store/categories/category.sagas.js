import {takeLatest, all, call, put} from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSucess, fetchCategoriesFailed } from './categories.action';
import { CATEGORIES_ACTION_TYPES } from './categories.type';

export function* fetchCategoriesAsync(){
    try{
        const categoriesArray= yield call(getCategoriesAndDocuments, 'categories');
        yield put(fetchCategoriesSucess(categoriesArray));

    } catch (error) {
        yield put(fetchCategoriesFailed(error))
    }

}

export function* onFetchCategories(){
    yield takeLatest(CATEGORIES_ACTION_TYPES.FECTH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga(){
    yield all([call(onFetchCategories)])
}