import Page from './Page';
import { connect } from 'react-redux';
import { authResetPassword } from '../../store/action';

const mapStateToProps = state => {
    return {
        rPToken: state.auth.rPToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        unsetRPToken: () => {
            dispatch(authResetPassword(null));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);