import '../scss/styles.scss';

import React, { useEffect } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MatGrid from '@material-ui/core/Grid';
// @material-ui/icons
import CheckCircle from '@material-ui/icons/CheckCircle';
import Error from '@material-ui/icons/Error';
// components
import Card from '../components/custom-card/Card';
import CardHeader from '../components/custom-card/CardHeader';
import CardBody from '../components/custom-card/CardBody';
import CardFooter from '../components/custom-card/CardFooter';
import Button from '../components/custom-button/Button';
import Form from '../components/forms/LoginForm';
import ForgotPasswordModal from '../components/modals/ForgotPasswordModal';
import Snackbar from '../components/custom-snackbar/Snackbar';
// actions
import { authLogin, authUser } from '../store/actions/authActions';
// services
import { login, me } from '../services/authService';

import initialize from '../utils/Initialize';
// styles
import styles from '../assets/jss/styles/loginStyle.js';

const useStyles = makeStyles(styles);

const Login = props => {
    const { app } = props;
    const classes = useStyles();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [usernameError, setUsernameError] = React.useState();
    const [passwordError, setPasswordError] = React.useState();
    const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = React.useState(false);
    const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);
    const [alertDialogMsg, setAlertDialogMsg] = React.useState('');
    const [alertDialogColor, setAlertDialogColor] = React.useState('success');

    useEffect(() => {
        const { auth } = props;

        if (auth.isAuthenticated) {
            Router.replace('/dashboard');
        }
    });

    const handleOnChange = (name, value) => {
        if (name === 'username') {
            validateEmail(value);
        } else if (name === 'password') {
            validatePassword(value);
        }
    };

    const validateEmail = (value) => {
        let usernameError;

        if (value === '') {
            usernameError = 'Email is required.';
        } else if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)) {
            usernameError = null;
        } else {
            usernameError = 'Email format is invalid.';
        }

        setUsername(value);
        setUsernameError(usernameError);
    };

    const validatePassword = (value) => {
        let passwordError;

        if (value === '') {
            passwordError = 'Password is required.';
        } else {
            passwordError = null;
        }

        setPassword(value);
        setPasswordError(passwordError);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            login({username: username, password: password})
                .then((data) => {
                    props.login(data.access_token);
                    return me();
                })
                .then((data) => {
                    props.setUser(data);
                    Router.push('/dashboard');
                })
                .catch((data) => {
                    setAlertDialogOpen(!alertDialogOpen);
                    setAlertDialogMsg(data.message);
                    setAlertDialogColor('danger');
                });
        }
    };

    const validateForm = () => {
        if (!username && !password) {
            setUsernameError('Email is required.');
            setPasswordError('Password is required.');
            return false;
        } else if (username && !password) {
            setPasswordError('Password is required.');
            return false;
        } else if (!username && password) {
            setUsernameError('Email is required.');
            return false;
        } else {
            if (!usernameError && !passwordError) {
                return true;
            }
        }
        return false;
    };

    const handleFPModalToggle = (e, data) => {
        e.preventDefault();

        setForgotPasswordModalOpen(!forgotPasswordModalOpen);

        if (data) {
            setAlertDialogOpen(!alertDialogOpen);
            setAlertDialogMsg(data.message);
            setAlertDialogColor(data.color);
        }
    };

    const handleOnCloseAlert = () => {
        setAlertDialogOpen(!alertDialogOpen);
    };

    const loginFormProps = {
        handleOnChange: handleOnChange,
        handleOnSubmit: handleOnSubmit,
        usernameError: usernameError,
        passwordError: passwordError,
    };

    const forgotPasswordModalProps = {
        isOpen: forgotPasswordModalOpen,
        handleFPModalToggle: handleFPModalToggle,
    };

    return (
        <div
            style={{
                backgroundImage: 'url(' + app.bgImage + ')',
                backgroundSize: 'cover'
            }}
        >
            <div className={classes.wrapper}>
                <MatGrid container justify="center">
                    <MatGrid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="primary" className={classes.header}>
                                <h4 className={classes.title}>{app.acronym}</h4>
                                <p className={classes.subTitle}>{app.name}</p>
                            </CardHeader>
                            <p className={classes.divider}>Login your account</p>
                            <CardBody>
                                <Form {...loginFormProps} />
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                                <Button
                                    simple
                                    color="primary"
                                    block={true}
                                    type="button"
                                    onClick={(e) => handleFPModalToggle(e)}
                                >
                                    Forgot Password
                                </Button>
                            </CardFooter>
                        </Card>
                    </MatGrid>
                </MatGrid>
            </div>
            <ForgotPasswordModal {...forgotPasswordModalProps} />
            <Snackbar
                message={alertDialogMsg}
                color={alertDialogColor}
                icon={alertDialogColor === 'success' ? CheckCircle : Error}
                place={'tc'}
                isOpen={alertDialogOpen}
                duration={3000}
                onClose={handleOnCloseAlert}
                autoClose={true}
            />
        </div>
    );
};

Login.getInitialProps = (ctx) => {
    return initialize(ctx);
};

const mapStateToProps = state => {
    return {
        app: state.app
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (data) => {
            dispatch(authLogin(data));
        },
        setUser: (data) => {
            dispatch(authUser(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);