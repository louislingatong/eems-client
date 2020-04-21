import '../scss/styles.scss';
import Router from 'next/router';
import { getCookie } from '../src/utils/Cookie';

const Index = () => null;

Index.getInitialProps = ctx => {
    if (ctx.isServer) {
        const token = getCookie('token', ctx.req);
        if (token) {
            ctx.res.writeHead(301, { Location: '/dashboard' });
            ctx.res.end();
        } else {
            ctx.res.writeHead(301, { Location: '/login' });
            ctx.res.end();
        }
    } else {
        const token = getCookie('token');
        if (token) {
            Router.replace('/dashboard');
        } else {
            Router.replace('/login');
        }
    }
};

export default Index;
