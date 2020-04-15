import Router from 'next/router';
import Http from '../utils/Http';
import * as authActions from '../store/actions/authActions';

/**
 * Fetch the current logged in user
 *
 * @returns {function(*)}
 */
export function me() {
    return dispatch => {
        Http.get('/api/me')
            .then((res) => {
                const data = res.data;
                dispatch(authActions.authUser(data));
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

/**
 * Login user
 *
 * @param credentials
 * @returns {function(*)}
 */
export function login(credentials) {
    return dispatch => {
        const config = {
            grant_type: 'password',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        };

        const data = {...credentials, ...config};

        Http.post('/oauth/token', data)
            .then((res) => {
                const data = res.data;
                dispatch(authActions.authLogin(data.access_token));
                dispatch(me());
                Router.push('/dashboard');
            })
            .catch((err) => {
                console.log(err);
            });

    };
}

/**
 * Logout user
 *
 * @returns {function(*)}
 */
export function logout() {
    return dispatch => {
        Http.delete('/api/oauth/token')
            .then(() => {
                dispatch(authActions.authLogout());
                Router.push('/login');
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

