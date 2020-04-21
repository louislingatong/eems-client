import React from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MatGrid from '@material-ui/core/Grid';
// @material-ui/icons
import CheckCircle from '@material-ui/icons/CheckCircle';
import Error from '@material-ui/icons/Error';
// components
import Card from '../../../../components/card/Card';
import CardHeader from '../../../../components/card/CardHeader';
import CardBody from '../../../../components/card/CardBody';
import CardFooter from '../../../../components/card/CardFooter';
import Button from '../../../../components/button/Button';
import Snackbar from '../../../../components/snackbar/Snackbar';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import Form from './components/Form';
// styles
import styles from '../../../../assets/jss/styles/modules/loginStyle.js';
// utils
import response from '../../../../utils/Response';
// default background
import bg from '../../../../assets/img/bg.jpg';

const useStyles = makeStyles(styles);

const Page = props => {
    const classes = useStyles();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [usernameError, setUsernameError] = React.useState();
    const [passwordError, setPasswordError] = React.useState();
    const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = React.useState(false);
    const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);
    const [alertDialogMsg, setAlertDialogMsg] = React.useState('');
    const [alertDialogColor, setAlertDialogColor] = React.useState('success');

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

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const res = await fetch(`${props.apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            try {
                const jsonRes = await response(res);
                props.authenticate(jsonRes.access_token);
                Router.push('/dashboard');
            } catch (errorRes) {
                const error = await errorRes;
                setAlertDialogOpen(!alertDialogOpen);
                setAlertDialogMsg(error.message);
                setAlertDialogColor('danger');
            }
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

    const handleFPModalToggle = (data) => {
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
        apiUrl: props.apiUrl
    };

    return (
        <div
            style={{
                backgroundImage: 'url(' + bg + ')',
                backgroundSize: 'cover'
            }}
        >
            <div className={classes.wrapper}>
                <MatGrid container justify="center">
                    <MatGrid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardHeader color="primary" className={classes.header}>
                                <h4 className={classes.title}>{process.env.APP_NAME_SHORT}</h4>
                                <p className={classes.subTitle}>{process.env.APP_NAME_LONG}</p>
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
                                    onClick={() => handleFPModalToggle()}
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

export default Page;