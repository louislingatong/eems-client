import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { getCookie } from './Cookie';
import { authLogin, authUser } from '../modules/auth/store/action';
import response from './Response';

export const withAuth = WrappedComponent => {
    class AuthComponent extends React.Component {
        static async getInitialProps(ctx) {
            const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
            let apiUrl, token, user;

            if (ctx.isServer) {
                apiUrl = `${protocol}://${ctx.req.headers.host}`;
                token = getCookie('token', ctx.req);
                if (!token) {
                    ctx.res.writeHead(301, { Location: '/login' });
                    ctx.res.end();
                }
            } else {
                apiUrl = `${protocol}://${window.location.host}`;
                token = getCookie('token');
                if (!token) {
                    Router.push('/login');
                }
            }

            if (token && !ctx.store.getState().auth.token) {
                ctx.store.dispatch(await authLogin(token));
            }

            if (token && !ctx.store.getState().auth.me) {

                const res = await fetch(`${apiUrl}/api/auth/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                try {
                    const data = await response(res);
                    user = data.data;
                    ctx.store.dispatch(await authUser(data.data));
                } catch (errorRes) {
                    console.log(await errorRes);
                }
            }

            const pageProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx);

            return {
                ...pageProps,
                apiUrl,
                token,
                user
            };
        }

        componentWillMount() {
            if (!this.props.auth.token && !this.props.auth.me) {
                this.props.reauthenticate(this.props.token);
                this.props.setUser(this.props.user);
            }
        }

        render () {
            return (
                <WrappedComponent {...this.props} />
            );
        }
    }

    const mapStateToProps = state => {
        return {
            auth: state.auth
        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            reauthenticate: (token) => {
                dispatch(authLogin(token));
            },
            setUser: (user) => {
                dispatch(authUser(user));
            }
        };
    };

    return connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
};
