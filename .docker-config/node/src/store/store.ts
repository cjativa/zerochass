import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { rootReducer } from 'store/reducers/topReducers';

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const customMiddleWare = (store: any) => (next: any) => (action: any) => {
    next({ ...action });
};

export const Store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(Store);

