import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/auth';
import storeReducer from './reducers/store';
import supplyReducer from './reducers/supply';

export const rootReducer = combineReducers({
    auth: authReducer,
    store: storeReducer,
    supply: supplyReducer,
});

export const middlewares = [ReduxThunk];

const composeEnhancers = composeWithDevTools({});

export const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middlewares))(createStore)

export const store = createStoreWithMiddleware(rootReducer);