import { connect } from 'react-redux';

import AdminLayout from './AdminLayout';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        app: state.app
    };
};

export default connect(mapStateToProps)(AdminLayout);