import fetch from 'isomorphic-unfetch';
import _ from 'lodash';

const fetcher = (req, url, data = {}) => {
    let options;
    if (_.isEmpty(req.body)) {
        options = {
            method: req.method,
            headers: {
                ...req.headers,
            }
        };
    } else {
        options = {
            method: req.method,
            headers: {
                ...req.headers,
            },
            body: JSON.stringify({
                ...data,
                ...req.body
            })
        };
    }

    return fetch(url, options);
};

const withFetch = handler => (req, res) => {
    req.fetch = (url, data) => fetcher(req, url, data);
    return handler(req, res);
};

export default withFetch;