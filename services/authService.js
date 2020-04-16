import Http from '../utils/Http';

/**
 * Fetch the current logged in user
 *
 * @returns {function(*)}
 */
export function me() {
    const promise = new Promise((resolve, reject) => {
        Http.get('/api/me')
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.response.data);
            });
    });
    return promise;
}

/**
 * Login user
 *
 * @param credentials
 * @returns {function(*)}
 */
export function login(credentials) {
    const config = {
        grant_type: 'password',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    };

    const data = {...credentials, ...config};

    const promise = new Promise((resolve, reject) => {
        Http.post('/oauth/token', data)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.response.data);
            });
    });
    return promise;

}

/**
 * Logout user
 *
 * @returns {function(*)}
 */
export function logout() {
    const promise = new Promise((resolve, reject) => {
        Http.delete('/api/auth/token')
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.response.data);
            });
    });
    return promise;
}

/**
 * Request forgot password link
 *
 * @returns {function(*)}
 */
export function forgotPassword(email) {
    const data = {email: email};
    const promise = new Promise((resolve, reject) => {
        Http.post('/api/auth/forgotPassword', data)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.response.data);
            });
    });
    return promise;
}

/**
 * Reset user password
 *
 * @returns {function(*)}
 */
export function resetPassword(password, token) {
    const data = {
        new_password: password,
        token: token
    };
    const promise = new Promise((resolve, reject) => {
        Http.post('/api/auth/resetPassword', data)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.response.data);
            });
    });
    return promise;
}


