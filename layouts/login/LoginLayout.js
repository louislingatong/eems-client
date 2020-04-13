import React from 'react';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/styles/layouts/loginStyle.js';
import Grid from '@material-ui/core/Grid';
// components
import CustomCard from '../../components/custom-card/CustomCard';
import CustomCardHeader from '../../components/custom-card/CustomCardHeader';
import CustomCardBody from '../../components/custom-card/CustomCardBody';
import CustomCardFooter from '../../components/custom-card/CustomCardFooter';
import Form from './components/LoginForm';
// services
import { login } from '../../services/authService';

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                username: null,
                password: null
            },
            usernameError: null,
            passwordError: null,
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    handleOnChange(name, value) {
        if (name === 'username') {
            this.validateEmail(value);
        } else if (name === 'password') {
            this.validatePassword(value);
        }
    }

    handleOnSubmit(e) {
        e.preventDefault();

        if (this.validateForm()) {
            this.props.dispatch(login(this.state.credentials));
        }
    }

    validateForm() {
        const {credentials, usernameError, passwordError} = this.state;

        if (!credentials.username && !credentials.password) {
            this.setState({
                usernameError: 'Email is required.',
                passwordError: 'Password is required.',
            });
            return false;
        } else if (credentials.username && !credentials.password) {
            this.setState({
                ...this.state,
                passwordError: 'Password is required.',
            });
            return false;
        } else if (!credentials.username && credentials.password) {
            this.setState({
                ...this.state,
                usernameError: 'Email is required.',
            });
            return false;
        } else {
            if (!usernameError && !passwordError) {
                return true;
            }
        }

        return false;
    }

    validateEmail(value) {
        let usernameError;

        if (value === '') {
            usernameError = 'Email is required.';
        } else if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)) {
            usernameError = null;
        } else {
            usernameError = 'Invalid email format.';
        }

        this.setState({
            ...this.state,
            credentials: {
                ...this.state.credentials,
                username: value
            },
            usernameError: usernameError
        });
    }

    validatePassword(value) {
        let passwordError;

        if (value === '') {
            passwordError = 'Password is required.';
        } else {
            passwordError = null;
        }

        this.setState({
            ...this.state,
            credentials: {
                ...this.state.credentials,
                password: value
            },
            passwordError: passwordError
        });
    }

    render() {
        const { classes, app } = this.props;
        const { usernameError, passwordError } = this.state;
        const props = {
            handleOnChange: this.handleOnChange,
            handleOnSubmit: this.handleOnSubmit,
            usernameError: usernameError,
            passwordError: passwordError
        };

        return (
            <div
                style={{
                    backgroundImage: 'url(' + app.bgImage + ')',
                    backgroundSize: 'cover',
                }}
            >
                <div className={classes.wrapper}>
                    <Grid container justify="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <CustomCard>
                                <CustomCardHeader color="primary" className={classes.header}>
                                    <h4 className={classes.title}>{app.acronym}</h4>
                                    <p className={classes.subTitle}>{app.name}</p>
                                </CustomCardHeader>
                                <p className={classes.divider}>Login your account</p>
                                <CustomCardBody>
                                    <Form {...props} />
                                </CustomCardBody>
                                <CustomCardFooter className={classes.cardFooter}>

                                </CustomCardFooter>
                            </CustomCard>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Page);
