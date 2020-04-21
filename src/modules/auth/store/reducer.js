import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_RESET_PASSWORD,
    AUTH_USER,
} from './actionTypes';

import { setCookie, removeCookie } from '../../../utils/Cookie';

const initialState = {
    token: null,
    rPToken: null,
    me: null
};

const authReducer = (state = initialState, {type, payload = null}) => {
    switch (type) {
    case AUTH_LOGIN:
        return login(state, payload);
    case AUTH_LOGOUT:
        return logout(state);
    case AUTH_RESET_PASSWORD:
        return setRPToken(state, payload);
    case AUTH_USER:
        return setUser(state, payload);
    default:
        return state;
    }
};

function login(state, payload) {
    setCookie('token', payload);

    return {
        ...state,
        token: payload,
    };
}

function logout(state) {
    removeCookie('token');

    return {
        ...state,
        token: null,
        me: null,
    };
}

function setRPToken(state, payload) {
    return {
        ...state,
        rPToken: payload,
    };
}

function setUser(state, payload) {
    return {
        ...state,
        me: payload,
    };
}

export default authReducer;