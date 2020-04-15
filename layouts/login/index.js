import { connect } from 'react-redux';

import LoginLayout from './LoginLayout';

const mapStateToProps = state => {
    return {
        auth: state.auth,
        app: state.app
    };
};

export default connect(mapStateToProps)(LoginLayout);