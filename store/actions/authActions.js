/**============================
 * Actions for the auth module
 * ============================
 *
 * The actions that are available on the
 * auth module
 */

import {
    AUTH_CHECK,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REFRESH_TOKEN,
    AUTH_RESET_PASSWORD,
    AUTH_USER,
} from '../action-types/authActionTypes';

export function authCheck() {
    return (dispatch) => {
        dispatch({
            type: AUTH_CHECK,
        });
    };
}

export function authLogin(payload) {
    return (dispatch) => {
        dispatch({
            type: AUTH_LOGIN,
            payload: payload,
        });
    };
}

export function authLogout() {
    return (dispatch) => {
        dispatch({
            type: AUTH_LOGOUT,
        });
    };
}

export function authRefreshToken(payload) {
    return (dispatch) => {
        dispatch({
            type: AUTH_REFRESH_TOKEN,
            payload: payload,
        });
    };
}

export function authResetPassword() {
    return (dispatch) => {
        dispatch({
            type: AUTH_RESET_PASSWORD,
        });
    };
}

export function authUser(payload) {
    return (dispatch) => {
        dispatch({
            type: AUTH_USER,
            payload: payload,
        });
    };
}