import React from 'react';
import Router from 'next/router';
import ResetPasswordLayout from '../../layouts/reset-password';
import initialize from '../../utils/Initialize';

import '../../scss/styles.scss';

class ResetPassword extends React.Component {

    static async getInitialProps(ctx) {
        return initialize(ctx);
    }

    componentDidMount() {
        const { auth } = this.props;

        if (!auth.resetPasswordToken) {
            Router.push('/login');
        }
    }

    render() {
        return (
            <React.Fragment>
                <ResetPasswordLayout />
            </React.Fragment>
        );
    }
}

export default ResetPassword;
