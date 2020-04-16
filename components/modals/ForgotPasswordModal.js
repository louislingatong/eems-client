import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/styles/components/forgot-password-modal/forgotPasswordModalStyle';
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
import CustomInput from '../custom-input/CustomInput';
import CustomButton from '../custom-button/CustomButton';
// services
import { forgotPassword } from '../../services/authService';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
});

class ForgotPasswordModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailError: null,
        };

        this.validateEmail = this.validateEmail.bind(this);
        this.handleOnCloseModal = this.handleOnCloseModal.bind(this);
        this.handleOnFPSubmit = this.handleOnFPSubmit.bind(this);
        this.validateFPSubmit = this.validateFPSubmit.bind(this);
    }

    validateEmail(value) {
        let emailError;

        if (value === '') {
            emailError = 'Email is required.';
        } else if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)) {
            emailError = null;
        } else {
            emailError = 'Email format is invalid.';
        }

        this.setState({
            ...this.state,
            email: value,
            emailError: emailError
        });
    }

    handleOnCloseModal(e) {
        e.preventDefault();

        this.setState({
            email: '',
            emailError: null,
        });

        return this.props.handleFPModalToggle(e);
    }

    handleOnFPSubmit(e) {
        e.preventDefault();

        if (this.validateFPSubmit()) {
            forgotPassword(this.state.email)
                .then(() => {
                    const alertData = {
                        message: 'Password reset link was sent to you email.',
                        color: 'success'
                    };
                    return this.props.handleFPModalToggle(e, alertData);
                })
                .catch(() => {
                    this.setState({
                        ...this.state,
                        emailError: 'Email is invalid.',
                    });
                });
        }
    }

    validateFPSubmit() {
        const { email } = this.state;

        if (!email) {
            this.setState({
                ...this.state,
                emailError: 'Email is required.'
            });
            return false;
        }

        return true;
    }

    render() {
        const { classes, isOpen } = this.props;
        const { email, emailError } = this.state;

        return (
            <Dialog
                classes={{
                    root: classes.center,
                    paper: classes.modal
                }}
                open={isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={(e) => this.handleOnCloseModal(e)}
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
                        onClick={(e) => this.handleOnCloseModal(e)}
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
                            onChange: (e) => this.validateEmail(e.target.value)
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
                        onClick={(e) => this.handleOnFPSubmit(e)}
                    >
                        Submit
                    </CustomButton>
                </DialogActions>
            </Dialog>
        );
    }
}

ForgotPasswordModal.propTypes = {
    isOpen: PropTypes.bool,
    handleFPModalToggle: PropTypes.func,
};

export default withStyles(styles)(ForgotPasswordModal);