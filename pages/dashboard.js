import React from 'react';
import Router from 'next/router';
import AdminLayout from '../layouts/admin';
import initialize from '../utils/Initialize';

import '../scss/styles.scss';

class Dashboard extends React.Component {

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
        } else {
            Router.replace('/login');
        }
    }

    render() {
        return (
            <React.Fragment>
                <AdminLayout />
            </React.Fragment>
        );
    }
}

export default Dashboard;