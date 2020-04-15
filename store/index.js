import { createStore, applyMiddleware  } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const enhancers = [
    applyMiddleware(thunkMiddleware)
];

const initialState = {};

export const initStore = () => {
    return createStore(rootReducer, initialState, composeWithDevTools(...enhancers));
};
