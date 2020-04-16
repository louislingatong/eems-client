import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import initialize from '../../../utils/Initialize';
import { authResetPasswordToken } from '../../../store/actions/authActions';

import '../../../scss/styles.scss';

class ResetPasswordToken extends React.Component {

    static async getInitialProps(ctx) {
        return initialize(ctx);
    }

    componentDidMount() {
        const { auth, router, setResetPasswordToken } = this.props;

        if (auth.isAuthenticated) {
            router.push('/dashboard');
        } else {
            const { token } = router.query;
            setResetPasswordToken(token);
            router.replace('/reset-password');
        }
    }

    render() {
        return (
            <React.Fragment />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setResetPasswordToken: (token) => {
            dispatch(authResetPasswordToken(token));
        }
    };
};

export default connect(null, mapDispatchToProps)(withRouter(ResetPasswordToken));
