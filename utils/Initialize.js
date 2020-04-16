import { getCookie } from '../utils/cookie';
import { authLogin, authCheck, authUser } from '../store/actions/authActions';
import { me } from '../services/authService';

export default async function(ctx) {
    if(ctx.isServer) {
        if (ctx.req.headers.cookie) {
            const token = getCookie('token', ctx.req);
            ctx.store.dispatch(await authLogin(token));
        }
    } else {
        const { auth } = ctx.store.getState();

        if (!auth.isAuthenticated && ctx.pathname !== '/login' && ctx.pathname !== '/reset-password') {
            ctx.store.dispatch(await authCheck());

            me().then((data) => {
                ctx.store.dispatch(authUser(data));
            });
        }
    }

    return ctx.store.getState();
}