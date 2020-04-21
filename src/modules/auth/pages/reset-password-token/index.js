import Page from './Page';
import { connect } from 'react-redux';
import { authResetPassword } from '../../store/action';

const mapDispatchToProps = dispatch => {
    return {
        setRPToken: (token) => {
            dispatch(authResetPassword(token));
        }
    };
};

export default connect(null, mapDispatchToProps)(Page);