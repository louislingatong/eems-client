import { connect } from 'react-redux';
// actions
import { authLogin, authUser } from '../../store/actions/authActions';

import Layout from './Layout';

const mapStateToProps = state => {
    return {
        app: state.app
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (data) => {
            dispatch(authLogin(data));
        },
        setUser: (data) => {
            dispatch(authUser(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);