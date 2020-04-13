import axios from 'axios';
// import { initStore } from '../redux';
// import { authLogout } from '../redux/actions/authActions';

// create new instance
const Http = axios.create();

// set default configuration
Http.defaults.baseURL = process.env.APP_URL;
Http.defaults.headers.common.Accept = 'application/json';

/**
 * intercept the response so we can handle the expected exceptions from the API
 */
Http.interceptors.response.use(
    response => response,
    (error) => {
        // if (error.response.status === 401) {
        //     initStore.dispatch(authLogout());
        // }
        return Promise.reject(error);
    });

export default Http;