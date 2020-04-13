import React from 'react';
import Router from 'next/router';
import LoginLayout from '../layouts/login';
import initialize from '../utils/Initialize';

import '../scss/styles.scss';

class Login extends React.Component {

    static getInitialProps(ctx) {
        return initialize(ctx);
    }

    componentDidMount() {
        const { auth } = this.props;

        if (auth) {
            if (auth.isAuthenticated) {
                Router.push('/dashboard');
            } else {
                Router.push('/login');
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <LoginLayout />
            </React.Fragment>
        );
    }
}

export default Login;
