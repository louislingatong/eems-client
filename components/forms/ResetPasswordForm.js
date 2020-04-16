import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
// styles
import styles from '../../assets/jss/styles/layouts/resetPasswordStyle.js';
// components
import CustomInput from '../custom-input/CustomInput';
import CustomButton from '../custom-button/CustomButton';

class Form extends React.Component {
    render() {
        const {
            classes,
            handleOnChange,
            handleOnSubmit,
            password,
            confirmPassword,
            passwordError,
            confirmPasswordError
        } = this.props;

        return (
            <form className={classes.form} onSubmit={(e) => handleOnSubmit(e)} noValidate>
                <CustomInput
                    labelText="Password"
                    id="password"
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
                        onChange: (e) => handleOnChange('password', e.target.value),
                        value: password
                    }}
                    error={typeof passwordError === 'string'}
                    helperText={passwordError}
                />
                <CustomInput
                    labelText="Confirm Password"
                    id="confirmPassword"
                    formControlProps={{
                        fullWidth: true,
                        error: typeof confirmPasswordError === 'string'
                    }}
                    inputProps={{
                        type: 'password',
                        endAdornment: (
                            <InputAdornment position="end">
                                <Icon
                                    className={
                                        confirmPasswordError
                                            ? classes.inputIconsColorDanger
                                            : classes.inputIconsColor
                                    }
                                >
                                    lock_outline
                                </Icon>
                            </InputAdornment>
                        ),
                        autoComplete: 'off',
                        name: 'confirmPassword',
                        onChange: (e) => handleOnChange('confirmPassword', e.target.value),
                        value: confirmPassword
                    }}
                    error={typeof confirmPasswordError === 'string'}
                    helperText={confirmPasswordError}
                />
                <CustomButton
                    variant="contained"
                    color="primary"
                    block={true}
                    className={classes.submitButton}
                    type="submit"
                >
                    Save
                </CustomButton>
            </form>
        );
    }
}

Form.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    passwordError: PropTypes.string,
    confirmPasswordError: PropTypes.string,
};

export default withStyles(styles)(Form);