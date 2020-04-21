import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
// @material-ui/icons
import Close from '@material-ui/icons/Close';
import Email from '@material-ui/icons/Email';
// components
import CustomInput from '../../../../../components/input/Input';
import CustomButton from '../../../../../components/button/Button';
//styles
import styles from '../../../../../assets/jss/styles/modules/forgotPasswordModalStyle';
// utils
import response from '../../../../../utils/Response';

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
});

const ForgotPasswordModal = props => {
    const { isOpen } = props;
    const classes = useStyles();

    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState();


    const validateEmail = (value) => {
        let emailError;

        if (value === '') {
            emailError = 'Email is required.';
        } else if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)) {
            emailError = null;
        } else {
            emailError = 'Email format is invalid.';
        }

        setEmail(value);
        setEmailError(emailError);
    };

    const handleOnCloseModal = (e) => {
        e.preventDefault();

        setEmail('');
        setEmailError();
        props.handleFPModalToggle();
    };

    const handleOnFPSubmit = async (e) => {
        e.preventDefault();

        if (validateFPSubmit()) {
            const res = await fetch(`${props.apiUrl}/api/auth/forgotPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                })
            });

            try {
                const data = await response(res);
                const alertData = {
                    message: data.message,
                    color: 'success'
                };
                setEmail('');
                setEmailError();
                return props.handleFPModalToggle(alertData);
            } catch (errorRes) {
                setEmailError('Email is invalid.');
            }
        }
    };

    const validateFPSubmit = () => {
        if (!email) {
            setEmailError('Email is required.');
            return false;
        }
        return true;
    };

    return (
        <Dialog
            classes={{
                root: classes.center,
                paper: classes.modal
            }}
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={(e) => handleOnCloseModal(e)}
            aria-labelledby='forgot-password-modal-slide-title'
            aria-describedby='forgot-password-modal-slide-description'
        >
            <DialogTitle
                id='forgot-password-modal-slide-title'
                disableTypography
                className={classes.modalHeader}
            >
                <IconButton
                    className={classes.modalCloseButton}
                    key='close'
                    aria-label='Close'
                    color='inherit'
                    onClick={(e) => handleOnCloseModal(e)}
                >
                    <Close className={classes.modalClose} />
                </IconButton>
                <h4 className={classes.modalTitle}>Forgot Password</h4>
            </DialogTitle>
            <DialogContent
                id='forgot-password-modal-slide-description'
                className={classes.modalBody}
            >
                <CustomInput
                    labelText="Email"
                    id="email"
                    formControlProps={{
                        fullWidth: true,
                        error: typeof emailError === 'string'
                    }}
                    inputProps={{
                        type: 'email',
                        endAdornment: (
                            <InputAdornment position="end">
                                <Email
                                    className={
                                        emailError
                                            ? classes.inputIconsColorDanger
                                            : classes.inputIconsColor
                                    }
                                />
                            </InputAdornment>
                        ),
                        name: 'email',
                        value: email,
                        onChange: (e) => validateEmail(e.target.value)
                    }}
                    error={typeof emailError === 'string'}
                    helperText={emailError}
                />
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
                <CustomButton
                    variant="contained"
                    color="primary"
                    block={true}
                    className={classes.submit}
                    type="button"
                    onClick={(e) => handleOnFPSubmit(e)}
                >
                    Submit
                </CustomButton>
            </DialogActions>
        </Dialog>
    );
};

ForgotPasswordModal.propTypes = {
    isOpen: PropTypes.bool,
    handleFPModalToggle: PropTypes.func,
};

export default ForgotPasswordModal;