import '../scss/styles.scss';

import React, { useEffect } from 'react';
import Router from 'next/router';

import initialize from '../utils/Initialize';

const Index = props => {
    useEffect(() => {
        const { auth } = props;

        if (auth.isAuthenticated) {
            Router.replace('/dashboard');
        } else {
            Router.replace('/login');
        }
    });

    return <React.Fragment />;
};

Index.getInitialProps = (ctx) => {
    return initialize(ctx);
};

export default Index;
