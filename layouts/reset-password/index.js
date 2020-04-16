import { connect } from 'react-redux';
// actions
import { authResetPasswordToken } from '../../store/actions/authActions';

import Layout from './Layout';

const mapStateToProps = state => {
    return {
        app: state.app,
        token: state.auth.resetPasswordToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        unsetResetPasswordToken: (data) => {
            dispatch(authResetPasswordToken(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);