import { getCookie } from '../utils/cookie';
import { authLogin, authCheck } from '../redux/actions/authActions';

export default function(ctx) {
    if(ctx.isServer) {
        if (ctx.req.headers.cookie) {
            const token = getCookie('token', ctx.req);
            ctx.store.dispatch(authLogin(token));
            return ctx.store.getState();
        }
    } else {
        ctx.store.dispatch(authCheck());
        return ctx.store.getState();
    }
}