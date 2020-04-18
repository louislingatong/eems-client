import HTTP from '../../utils/Http';
import {
    AUTH_CHECK,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REFRESH_TOKEN,
    AUTH_RESET_PASSWORD_TOKEN,
    AUTH_USER,
} from '../action-types/authActionTypes';

import * as cookie from '../../utils/cookie';

const initialState = {
    isAuthenticated: false,
    me: null,
    resetPasswordToken: null,
};

const authReducer = (state = initialState, {type, payload = null}) => {
    switch (type) {
    case AUTH_REFRESH_TOKEN:
    case AUTH_LOGIN:
        return login(state, payload);
    case AUTH_CHECK:
        return checkAuth(state);
    case AUTH_LOGOUT:
        return logout(state);
    case AUTH_RESET_PASSWORD_TOKEN:
        return setResetPasswordToken(state, payload);
    case AUTH_USER:
        return setUser(state, payload);
    default:
        return state;
    }
};

function login(state, payload) {
    cookie.set('token', payload);
    HTTP.defaults.headers.common['Authorization'] = `Bearer ${payload}`;

    return {
        ...state,
        isAuthenticated: true,
    };
}

function checkAuth(state) {
    const isAuthenticated = !!cookie.get('token');

    if (isAuthenticated) {
        HTTP.defaults.headers.common['Authorization'] = `Bearer ${cookie.get('token')}`;
    }

    return {
        ...state,
        isAuthenticated: isAuthenticated
    };
}

function logout(state) {
    cookie.remove('token');

    return {
        ...state,
        isAuthenticated: false,
    };
}

function setResetPasswordToken(state, payload) {
    return {
        ...state,
        resetPasswordToken: payload,
    };
}

function setUser(state, payload) {
    return {
        ...state,
        me: payload.data,
    };
}

export default authReducer;