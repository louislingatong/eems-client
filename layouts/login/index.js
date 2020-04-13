import { connect } from 'react-redux';

import LoginLayout from './LoginLayout';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        app: state.app
    };
};

export default connect(mapStateToProps)(LoginLayout);