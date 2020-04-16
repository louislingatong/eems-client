import React from 'react';
import Router from 'next/router';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/styles/layouts/resetPasswordStyle.js';
import Grid from '@material-ui/core/Grid';
// @material-ui/icons
import CheckCircle from '@material-ui/icons/CheckCircle';
import Error from '@material-ui/icons/Error';
// components
import CustomCard from '../../components/custom-card/CustomCard';
import CustomCardHeader from '../../components/custom-card/CustomCardHeader';
import CustomCardBody from '../../components/custom-card/CustomCardBody';
import Form from '../../components/forms/ResetPasswordForm';
import CustomSnackbar from '../../components/custom-snackbar/CustomSnackbar';
// services
import { resetPassword } from '../../services/authService';

class Layout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            password: '',
            confirmPassword: '',
            passwordError: null,
            confirmPasswordError: null,
            alertDialogIsOpen: false,
            alertDialogIsMsg: '',
            alertDialogColor: 'success'
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleOnCloseAlert = this.handleOnCloseAlert.bind(this);
    }

    handleOnChange(name, value) {
        let obj = {};

        if (value === '') {
            obj[name] = value;
            obj[`${name}Error`] = name === 'password' ? 'Password is required.' : 'Password mismatch.';
        } else {
            obj[name] = value;
            obj[`${name}Error`] = null;
        }

        this.setState({
            ...this.state,
            ...obj
        });
    }

    handleOnSubmit(e) {
        e.preventDefault();

        if (this.validateForm()) {
            const { password } = this.state;
            const { token } = this.props;
            resetPassword(password, token)
                .then(() => {
                    this.props.unsetResetPasswordToken(null);
                    Router.push('/login');
                })
                .catch(() => {
                    this.setState({
                        password: '',
                        confirmPassword: '',
                        passwordError: null,
                        confirmPasswordError: null,
                        alertDialogIsOpen: !this.state.alertDialogIsOpen,
                        alertDialogIsMsg: 'Invalid token.',
                        alertDialogColor: 'danger'
                    });
                });
        }
    }

    validateForm() {
        const {password, confirmPassword, passwordError, confirmPasswordError} = this.state;

        if (!password && !confirmPassword) {
            this.setState({
                passwordError: 'Password is required.',
                confirmPasswordError: 'Password mismatch.',
            });
            return false;
        } else if (password && !confirmPassword) {
            this.setState({
                ...this.state,
                passwordError: 'Password is required.',
            });
            return false;
        } else if (!password && confirmPassword) {
            this.setState({
                ...this.state,
                confirmPasswordError: 'Password mismatch.',
            });
            return false;
        } else if (password !== confirmPassword) {
            this.setState({
                ...this.state,
                confirmPasswordError: 'Password mismatch.',
            });
            return false;
        } else {
            if (!passwordError && !confirmPasswordError) {
                return true;
            }
        }

        return false;
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
            password,
            confirmPassword,
            passwordError,
            confirmPasswordError,
            alertDialogIsOpen,
            alertDialogIsMsg,
            alertDialogColor
        } = this.state;

        const resetPasswordFormProps = {
            handleOnChange: this.handleOnChange,
            handleOnSubmit: this.handleOnSubmit,
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
                    <Grid container justify="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <CustomCard>
                                <CustomCardHeader color="primary" className={classes.header}>
                                    <h4 className={classes.title}>{app.acronym}</h4>
                                    <p className={classes.subTitle}>{app.name}</p>
                                </CustomCardHeader>
                                <p className={classes.divider}>Reset your password</p>
                                <CustomCardBody>
                                    <Form {...resetPasswordFormProps} />
                                </CustomCardBody>
                            </CustomCard>
                        </Grid>
                    </Grid>
                </div>
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
