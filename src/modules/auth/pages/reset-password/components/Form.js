import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// components
import Input from '../../../../../components/input/Input';
import Button from '../../../../../components/button/Button';
// styles
import styles from '../../../../../assets/jss/styles/modules/resetPasswordStyle.js';

const useStyles = makeStyles(styles);

const Form = props => {
    const {
        handleOnChange,
        handleOnSubmit,
        password,
        confirmPassword,
        passwordError,
        confirmPasswordError
    } = props;
    const classes = useStyles();

    return (
        <form className={classes.form} onSubmit={(e) => handleOnSubmit(e)} noValidate>
            <Input
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
            <Input
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
            <Button
                variant="contained"
                color="primary"
                block={true}
                className={classes.submitButton}
                type="submit"
            >
                Save
            </Button>
        </form>
    );
};

Form.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    passwordError: PropTypes.string,
    confirmPasswordError: PropTypes.string,
};

export default Form;