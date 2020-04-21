import Page from './Page';
import { connect } from 'react-redux';
import { authLogin} from '../../store/action';

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (token) => (
            dispatch(authLogin(token))
        )
    };
};

export default connect(null, mapDispatchToProps)(Page);