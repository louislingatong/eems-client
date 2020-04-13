import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import initialize from '../utils/Initialize';
import { login } from '../services/authService';

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            credentials: {
                email: '',
                password: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static getInitialProps(ctx) {
        return initialize(ctx);
    }

    componentDidMount() {
        const { auth } = this.props;

        console.log(this.props);

        if (auth) {
            if (auth.isAuthenticated) {
                Router.push('/dashboard');
            } else {
                Router.push('/login');
            }
        }
    }

    handleChange(name, value) {
        this.setState({credentials: {...this.state.credentials, [name]: value}});
    }

    handleSubmit(e) {
        e.preventDefault();

        const { credentials } = this.state;
        const { onSubmit } = this.props;

        onSubmit(credentials);
    }

    render() {
        return (
            <React.Fragment>
                <h3>Login</h3>
                <form onSubmit={this.handleSubmit} style={{width: '540px'}}>
                    <div>
                        <p>
                            <input
                                name="username"
                                type="email"
                                placeholder="Email"
                                required
                                value={this.state.email}
                                onChange={e => this.handleChange(e.target.name, e.target.value)}
                            />
                        </p>
                    </div>
                    <div>
                        <p>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                                value={this.state.credentials.password}
                                onChange={e => this.handleChange(e.target.name, e.target.value)}
                            />
                        </p>
                    </div>
                    <div className="field">
                        <p>
                            <button type="submit">
                                Sign In
                            </button>
                        </p>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (data) => {
            dispatch(login(data));
        }
    };
};

export default connect(null, mapDispatchToProps)(Login);
