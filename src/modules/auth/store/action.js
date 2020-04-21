/**============================
 * Actions for the auth module
 * ============================
 *
 * The actions that are available on the
 * auth module
 */

import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_USER,
    AUTH_RESET_PASSWORD,
} from './actionTypes';

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

export function authUser(payload) {
    return (dispatch) => {
        dispatch({
            type: AUTH_USER,
            payload: payload,
        });
    };
}

export function authResetPassword(payload) {
    return (dispatch) => {
        dispatch({
            type: AUTH_RESET_PASSWORD,
            payload: payload,
        });
    };
}