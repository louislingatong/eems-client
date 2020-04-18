import '../../../scss/styles.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
// actions
import { authResetPasswordToken } from '../../../store/actions/authActions';

import initialize from '../../../utils/Initialize';

const ResetPasswordToken = props => {
    const router = useRouter();

    useEffect(() => {
        const { auth } = props;

        if (auth.isAuthenticated) {
            router.push('/dashboard');
        } else {
            const { token } = router.query;
            props.setResetPasswordToken(token);
            router.replace('/reset-password');
        }
    });

    return <React.Fragment />;
};

ResetPasswordToken.getInitialProps = (ctx) => {
    return initialize(ctx);
};

const mapDispatchToProps = dispatch => {
    return {
        setResetPasswordToken: (token) => {
            dispatch(authResetPasswordToken(token));
        }
    };
};

export default connect(null, mapDispatchToProps)(ResetPasswordToken);
