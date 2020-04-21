import '../scss/styles.scss';
import React from 'react';
import Router from 'next/router';
import Page from '../src/modules/auth/pages/login';
import { getCookie } from '../src/utils/Cookie';

const Login = props => {
    return (
        <React.Fragment>
            <Page {...props}/>
        </React.Fragment>
    );
};

Login.getInitialProps = async (ctx) => {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    let token, apiUrl;

    if (ctx.isServer) {
        token = getCookie('token', ctx.req);
        if (token) {
            ctx.res.writeHead(301, { Location: '/dashboard' });
            ctx.res.end();
        }
        apiUrl = `${protocol}://${ctx.req.headers.host}`;
    } else {
        token = getCookie('token');
        if (token) {
            Router.replace('/dashboard');
        }
        apiUrl = `${protocol}://${window.location.host}`;
    }

    return { apiUrl, token };
};

export default Login;