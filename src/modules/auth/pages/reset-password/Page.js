import React, { useEffect } from 'react';
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
import Snackbar from '../../../../components/snackbar/Snackbar';
import Form from './components/Form';
// styles
import styles from '../../../../assets/jss/styles/modules/resetPasswordStyle.js';
// utils
import response from '../../../../utils/Response';
// default background
import bg from '../../../../assets/img/bg.jpg';

const useStyles = makeStyles(styles);

const Page = props => {
    const classes = useStyles();

    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState();
    const [confirmPasswordError, setConfirmPasswordError] = React.useState();
    const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);
    const [alertDialogMsg, setAlertDialogMsg] = React.useState('');
    const [alertDialogColor, setAlertDialogColor] = React.useState('success');

    useEffect(() => {
        if (!props.rPToken) {
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

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const res = await fetch(`${props.apiUrl}/api/auth/resetPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    new_password: password,
                    token: props.rPToken
                })
            });

            try {
                await response(res);
                props.unsetRPToken();
                Router.push('/login');
            } catch (errorRes) {
                const error = await errorRes;
                setAlertDialogOpen(!alertDialogOpen);
                setAlertDialogMsg(error.message);
                setAlertDialogColor('danger');
            }
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

export default Page;
