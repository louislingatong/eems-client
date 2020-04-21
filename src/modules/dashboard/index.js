import Page from './Page';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(Page);