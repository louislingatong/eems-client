import jsCookie from 'js-cookie';

export const set = (key, value) => {
    if (process.browser) {
        jsCookie.set(key, value);
    }
};

export const remove = (key) => {
    if (process.browser) {
        jsCookie.remove(key);
    }
};

export const get = (key, req) => {
    return process.browser
        ? getFromBrowser(key)
        : getFromServer(key, req);
};

const getFromBrowser = key => {
    return jsCookie.get(key);
};

const getFromServer = (key, req) => {
    if (!req.headers.cookie) {
        return undefined;
    }
    const rawCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith(`${key}=`));
    if (!rawCookie) {
        return undefined;
    }
    return rawCookie.split('=')[1];
};