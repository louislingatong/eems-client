import '../../scss/styles.scss';

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
import Card from '../../components/custom-card/Card';
import CardHeader from '../../components/custom-card/CardHeader';
import CardBody from '../../components/custom-card/CardBody';
import Form from '../../components/forms/ResetPasswordForm';
import Snackbar from '../../components/custom-snackbar/Snackbar';
// actions
import * as authActions from '../../store/actions/authActions';
// services
import { resetPassword } from '../../services/authService';

import initialize from '../../utils/Initialize';
// styles
import styles from '../../assets/jss/styles/resetPasswordStyle.js';

const useStyles = makeStyles(styles);

const ResetPassword = props => {
    const { app, token } = props;
    const classes = useStyles();

    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState();
    const [confirmPasswordError, setConfirmPasswordError] = React.useState();
    const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);
    const [alertDialogMsg, setAlertDialogMsg] = React.useState('');
    const [alertDialogColor, setAlertDialogColor] = React.useState('success');

    useEffect(() => {
        const { auth } = props;

        if (!auth.resetPasswordToken) {
            Router.replace('/login');
        }
    });

    const handleOnChange = (name, value) => {
        if (name === 'password') {
            if (value === '') {
                setPasswordError('Password is required.');
            } else {
                setPasswordError(null);
            }
            setPassword(value);
        } else if (name === 'confirmPassword') {
            if (value === '') {
                setConfirmPasswordError('Password mismatch.');
            } else {
                setConfirmPasswordError(null);
            }
            setConfirmPassword(value);
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            resetPassword(password, token)
                .then(() => {
                    props.unsetResetPasswordToken();
                    Router.push('/login');
                })
                .catch(() => {
                    setAlertDialogOpen(!alertDialogOpen);
                    setAlertDialogMsg('Invalid token.');
                    setAlertDialogColor('danger');
                });
        }
    };

    const validateForm = () => {
        if (!password && !confirmPassword) {
            setPasswordError('Password is required.');
            setConfirmPasswordError('Password mismatch.');
            return false;
        } else if (password && !confirmPassword) {
            setConfirmPasswordError('Password mismatch.');
            return false;
        } else if (!password && confirmPassword) {
            setPasswordError('Password is required.');
            return false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Password mismatch.');
            return false;
        } else {
            if (!passwordError && !confirmPasswordError) {
                return true;
            }
        }
        return false;
    };

    const handleOnCloseAlert = () => {
        setAlertDialogOpen(!alertDialogOpen);
        setAlertDialogMsg('');
        setAlertDialogColor('success');
    };

    const resetPasswordFormProps = {
        handleOnChange: handleOnChange,
        handleOnSubmit: handleOnSubmit,
        password: password,
        confirmPassword: confirmPassword,
        passwordError: passwordError,
        confirmPasswordError: confirmPasswordError,
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
                            <p className={classes.divider}>Reset your password</p>
                            <CardBody>
                                <Form {...resetPasswordFormProps} />
                            </CardBody>
                        </Card>
                    </MatGrid>
                </MatGrid>
            </div>
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

ResetPassword.getInitialProps = (ctx) => {
    return initialize(ctx);
};

const mapStateToProps = state => {
    return {
        app: state.app,
        token: state.auth.resetPasswordToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        unsetResetPasswordToken: () => {
            dispatch(authActions.authResetPasswordToken(null));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
