import React from 'react';
import Router from 'next/router';
import initialize from '../utils/Initialize';

class Index extends React.Component {

    static getInitialProps(ctx) {
        return initialize(ctx);
    }

    componentDidMount() {
        const { auth } = this.props;

        if (auth) {
            if (auth.isAuthenticated) {
                Router.replace('/dashboard');
            } else {
                Router.replace('/login');
            }
        } else {
            Router.replace('/login');
        }
    }

    render() {
        return <React.Fragment />;
    }
}

export default Index;