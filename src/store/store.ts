import {compose, createStore, applyMiddleware} from 'redux';
//import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import {persistStore, persistReducer, PersistConfig} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {loggerMiddleware} from './middlewares/logger';
//import {thunk} from 'redux-thunk'; 
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './root-saga'
import { Middleware } from 'redux';

export type RootState= ReturnType<typeof rootReducer>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const sagaMiddleware= createSagaMiddleware();

const middleWares= [ process.env.NODE_ENV === 'development' && loggerMiddleware, sagaMiddleware ].filter((middleware): middleware is Middleware=> Boolean(middleware));

const composeEnhancer= (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers= composeEnhancer(applyMiddleware(...middleWares));

export type ExtendedPersistConfig= PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
};

const persistConfig: ExtendedPersistConfig= {
    key: 'root',
    storage,
    whitelist: ['cart']
};

const persistedReducer= persistReducer(persistConfig, rootReducer);

export const store= createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor= persistStore(store);
