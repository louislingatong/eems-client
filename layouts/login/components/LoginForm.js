import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
// styles
import styles from '../../../assets/jss/styles/layouts/loginStyle.js';
// components
import CustomInput from '../../../components/custom-input/CustomInput';
import CustomButton from '../../../components/custom-button/CustomButton';

class Form extends React.Component {
    render() {
        const { classes, handleOnChange, handleOnSubmit, usernameError, passwordError } = this.props;
        return (
            <form className={classes.form} onSubmit={(e) => handleOnSubmit(e)} noValidate>
                <CustomInput 
                    labelText="Email"
                    id="username"
                    formControlProps={{
                        fullWidth: true,
                        error: typeof usernameError === 'string'
                    }}
                    inputProps={{
                        type: 'email',
                        endAdornment: (
                            <InputAdornment position="end">
                                <Email
                                    className={
                                        usernameError
                                            ? classes.inputIconsColorDanger
                                            : classes.inputIconsColor
                                    }
                                />
                            </InputAdornment>
                        ),
                        name: 'username',
                        onChange: (e) => handleOnChange('username', e.target.value)
                    }}
                    error={typeof usernameError === 'string'}
                    helperText={usernameError}
                />
                <CustomInput
                    labelText="Password"
                    id="pass"
                    formControlProps={{
                        fullWidth: true,
                        error: typeof passwordError === 'string'
                    }}
                    inputProps={{
                        type: 'password',
                        endAdornment: (
                            <InputAdornment position="end">
                                <Icon
                                    className={
                                        passwordError
                                            ? classes.inputIconsColorDanger
                                            : classes.inputIconsColor
                                    }
                                >
                                    lock_outline
                                </Icon>
                            </InputAdornment>
                        ),
                        autoComplete: 'off',
                        name: 'password',
                        onChange: (e) => handleOnChange('password', e.target.value)
                    }}
                    error={typeof passwordError === 'string'}
                    helperText={passwordError}
                />
                <CustomButton
                    variant="contained"
                    color="primary"
                    block={true}
                    className={classes.loginButton}
                    type="submit"
                >
                    Login
                </CustomButton>
            </form>
        );
    }
}

Form.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    usernameError: PropTypes.string
};

export default withStyles(styles)(Form);