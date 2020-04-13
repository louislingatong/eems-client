import Router from 'next/router';
import Http from '../utils/Http';
import * as authActions from '../redux/actions/authActions';

/**
 * Fetch the current logged in user
 *
 * @returns {function(*)}
 */
export function fetchUser() {
    return dispatch => {
        new Promise((resolve, reject) => {
            Http.get('/api/user')
                .then((res) => {
                    const data = res.data;
                    dispatch(authActions.authUser(data));
                    return resolve(data);
                })
                .catch((err) => {
                    return reject(err);
                });
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

        new Promise((resolve, reject) => {
            Http.post('/oauth/token', data)
                .then((res) => {
                    const data = res.data;
                    dispatch(authActions.authLogin(data.access_token));
                    Router.push('/dashboard');
                    return resolve(data);
                })
                .catch((err) => {
                    return reject(err);
                });
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
        new Promise((resolve, reject) => {
            Http.delete('/api/oauth/token')
                .then((res) => {
                    const data = res.data;
                    dispatch(authActions.authLogout());
                    Router.push('/login');
                    return resolve(data);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    };
}

