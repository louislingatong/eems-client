import '../scss/styles.scss';

import React, { useEffect } from 'react';
import Router from 'next/router';
import AdminLayout from '../layouts/AdminLayout';

import initialize from '../utils/Initialize';

const Dashboard = props => {
    useEffect(() => {
        const { auth } = props;

        if (!auth.isAuthenticated) {
            Router.replace('/login');
        }
    });

    return (
        <React.Fragment>
            <AdminLayout />
        </React.Fragment>
    );
};

Dashboard.getInitialProps = (ctx) => {
    return initialize(ctx);
};

export default Dashboard;