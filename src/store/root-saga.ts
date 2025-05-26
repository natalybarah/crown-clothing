import {all, call} from 'typed-redux-saga/macro';
import {categoriesSaga} from './categories/category.sagas';
import { userSagas } from './user/user.sagas';

export function* rootSaga(){ 
    yield* all([call(categoriesSaga), call(userSagas)])
};

