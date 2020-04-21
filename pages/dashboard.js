import '../scss/styles.scss';
import React, { useEffect } from 'react';
import withAdminLayout from '../src/layouts/admin';
import { withAuth } from '../src/utils/withAuth';
import Page from '../src/modules/dashboard';

const Dashboard = props => {
    useEffect(() => {
        //
    });

    return (
        <React.Fragment>
            <Page {...props}/>
        </React.Fragment>
    );
};

Dashboard.getInitialProps = () => {
    //
};

export default withAuth(withAdminLayout(Dashboard));