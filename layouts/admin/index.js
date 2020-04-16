import { connect } from 'react-redux';
// actions

import Layout from './Layout';

const mapStateToProps = state => {
    return {
        app: state.app
    };
};

export default connect(mapStateToProps)(Layout);