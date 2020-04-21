import { combineReducers } from 'redux';
import authReducer from '../modules/auth/store/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;