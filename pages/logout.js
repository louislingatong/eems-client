import '../scss/styles.scss';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import response from '../src/utils/Response';
import { getCookie } from '../src/utils/Cookie';
import { authLogout } from '../src/modules/auth/store/action';

const Logout = () => null;

Logout.getInitialProps = async (ctx) => {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    let token, apiUrl;

    if (ctx.isServer) {
        token = getCookie('token', ctx.req);
        apiUrl = `${protocol}://${ctx.req.headers.host}`;
    } else {
        token = getCookie('token');
        apiUrl = `${protocol}://${window.location.host}`;
    }

    if (token) {
        const res = await fetch(`${apiUrl}/api/auth/logout`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        try {
            await response(res);
            ctx.store.dispatch(await authLogout());
            if (ctx.isServer) {
                ctx.res.writeHead(301, { Location: '/login' });
                ctx.res.end();
            } else {
                Router.replace('/login');
            }
        } catch (errorRes) {
            console.log(await errorRes);
        }
    } else {
        if (ctx.isServer) {
            ctx.res.writeHead(301, { Location: '/login' });
            ctx.res.end();
        } else {
            Router.replace('/login');
        }
    }
};

export default Logout;