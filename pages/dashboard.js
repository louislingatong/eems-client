import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import initialize from '../utils/Initialize';
import { logout } from '../services/authService';

class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            credentials: {
                email: '',
                password: ''
            }
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    static getInitialProps(ctx) {
        return initialize(ctx);
    }

    componentDidMount() {
        const { auth } = this.props;

        if (auth) {
            if (auth.isAuthenticated) {
                Router.push('/dashboard');
            } else {
                Router.push('/login');
            }
        } else {
            Router.replace('/login');
        }
    }

    handleLogout(e) {
        e.preventDefault();

        const { onLogout } = this.props;

        onLogout();
    }

    render() {
        return (
            <React.Fragment>
                <h3>Welcome to dashboard</h3>
                <button type="button" onClick={this.handleLogout}>
                    Logout
                </button>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            dispatch(logout());
        }
    };
};

export default connect(null, mapDispatchToProps)(Dashboard);