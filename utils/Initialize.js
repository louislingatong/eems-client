import { getCookie } from '../utils/cookie';
import { authCheck, authLogin } from '../store/actions/authActions';
import { me } from '../services/authService';

export default async function(ctx) {
    if(ctx.isServer) {
        if (ctx.req.headers.cookie) {
            const token = getCookie('token', ctx.req);
            ctx.store.dispatch(await authLogin(token));
        }
    } else {
        const { auth } = ctx.store.getState();

        if (!auth.isAuthenticated && !auth.me) {
            ctx.store.dispatch(await authCheck());
            ctx.store.dispatch(await me());
        }
    }

    return ctx.store.getState();
}