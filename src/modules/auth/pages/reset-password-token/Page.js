import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const ResetPasswordToken = props => {
    const router = useRouter();

    useEffect(() => {
        const { token } = router.query;
        props.setRPToken(token);
        router.replace('/reset-password');
    });

    return <React.Fragment />;
};

export default ResetPasswordToken;