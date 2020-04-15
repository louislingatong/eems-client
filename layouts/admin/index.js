import { connect } from 'react-redux';

import AdminLayout from './AdminLayout';

const mapStateToProps = state => {
    return {
        auth: state.auth,
        app: state.app
    };
};

export default connect(mapStateToProps)(AdminLayout);