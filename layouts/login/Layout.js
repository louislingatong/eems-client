import React from 'react';
import Router from 'next/router';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/styles/layouts/loginStyle.js';
import Grid from '@material-ui/core/Grid';
// @material-ui/icons
import CheckCircle from '@material-ui/icons/CheckCircle';
import Error from '@material-ui/icons/Error';
// components
import CustomCard from '../../components/custom-card/CustomCard';
import CustomCardHeader from '../../components/custom-card/CustomCardHeader';
import CustomCardBody from '../../components/custom-card/CustomCardBody';
import CustomCardFooter from '../../components/custom-card/CustomCardFooter';
import Form from '../../components/forms/LoginForm';
import CustomButton from '../../components/custom-button/CustomButton';
import ForgotPasswordModal from '../../components/modals/ForgotPasswordModal';
import CustomSnackbar from '../../components/custom-snackbar/CustomSnackbar';
// services
import { login, me } from '../../services/authService';

class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                username: '',
                password: ''
            },
            usernameError: null,
            passwordError: null,
            forgotPassModalIsOpen: false,
            alertDialogIsOpen: false,
            alertDialogIsMsg: '',
            alertDialogColor: 'success'
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.handleFPModalToggle = this.handleFPModalToggle.bind(this);
        this.handleOnCloseAlert = this.handleOnCloseAlert.bind(this);
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
            login(this.state.credentials)
                .then((data) => {
                    this.props.login(data.access_token);
                    return me();
                })
                .then((data) => {
                    this.props.setUser(data);
                    Router.push('/dashboard');
                })
                .catch((data) => {
                    this.setState({
                        ...this.state,
                        alertDialogIsOpen: !this.state.alertDialogIsOpen,
                        alertDialogIsMsg: data.message,
                        alertDialogColor: 'danger'
                    });
                });
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
            usernameError = 'Email format is invalid.';
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

    handleFPModalToggle(e, data) {
        e.preventDefault();

        const alertProps = data ? {
            alertDialogIsOpen: !this.state.alertDialogIsOpen,
            alertDialogIsMsg: data.message,
            alertDialogColor: data.color
        } : {};

        this.setState({
            ...this.state,
            forgotPassModalIsOpen: !this.state.forgotPassModalIsOpen,
            ...alertProps
        });
    }

    handleOnCloseAlert() {
        this.setState({
            ...this.state,
            alertDialogIsOpen: !this.state.alertDialogIsOpen,
            alertDialogIsMsg: '',
        });
    }

    render() {
        const { classes, app } = this.props;
        const {
            usernameError,
            passwordError,
            forgotPassModalIsOpen,
            alertDialogIsOpen,
            alertDialogIsMsg,
            alertDialogColor
        } = this.state;
        const loginFormProps = {
            handleOnChange: this.handleOnChange,
            handleOnSubmit: this.handleOnSubmit,
            usernameError: usernameError,
            passwordError: passwordError,
        };
        const forgotPassModalProps = {
            isOpen: forgotPassModalIsOpen,
            handleFPModalToggle: this.handleFPModalToggle,
        };

        return (
            <div
                style={{
                    backgroundImage: 'url(' + app.bgImage + ')',
                    backgroundSize: 'cover'
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
                                    <Form {...loginFormProps} />
                                </CustomCardBody>
                                <CustomCardFooter className={classes.cardFooter}>
                                    <CustomButton
                                        simple
                                        color="primary"
                                        block={true}
                                        type="button"
                                        onClick={(e) => this.handleFPModalToggle(e)}
                                    >
                                        Forgot Password
                                    </CustomButton>
                                </CustomCardFooter>
                            </CustomCard>
                        </Grid>
                    </Grid>
                </div>
                <ForgotPasswordModal {...forgotPassModalProps} />
                <CustomSnackbar
                    message={alertDialogIsMsg}
                    color={alertDialogColor}
                    icon={alertDialogColor === 'success' ? CheckCircle : Error}
                    place={'tc'}
                    isOpen={alertDialogIsOpen}
                    duration={3000}
                    onClose={this.handleOnCloseAlert}
                    autoClose={true}
                />
            </div>
        );
    }
}

export default withStyles(styles)(Layout);
