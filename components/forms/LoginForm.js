import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MatInputAdornment from '@material-ui/core/InputAdornment';
import MatIcon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
// components
import Input from '../custom-input/Input';
import Button from '../custom-button/Button';
// styles
import styles from '../../assets/jss/styles/loginStyle.js';

const useStyles = makeStyles(styles);

const Form = props => {
    const { handleOnChange, handleOnSubmit, usernameError, passwordError } = props;
    const classes = useStyles();

    return (
        <form className={classes.form} onSubmit={(e) => handleOnSubmit(e)} noValidate>
            <Input
                labelText="Email"
                id="username"
                formControlProps={{
                    fullWidth: true,
                    error: typeof usernameError === 'string'
                }}
                inputProps={{
                    type: 'email',
                    endAdornment: (
                        <MatInputAdornment position="end">
                            <Email
                                className={
                                    usernameError
                                        ? classes.inputIconsColorDanger
                                        : classes.inputIconsColor
                                }
                            />
                        </MatInputAdornment>
                    ),
                    name: 'username',
                    onChange: (e) => handleOnChange('username', e.target.value)
                }}
                error={typeof usernameError === 'string'}
                helperText={usernameError}
            />
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
                        <MatInputAdornment position="end">
                            <MatIcon
                                className={
                                    passwordError
                                        ? classes.inputIconsColorDanger
                                        : classes.inputIconsColor
                                }
                            >
                                lock_outline
                            </MatIcon>
                        </MatInputAdornment>
                    ),
                    autoComplete: 'off',
                    name: 'password',
                    onChange: (e) => handleOnChange('password', e.target.value)
                }}
                error={typeof passwordError === 'string'}
                helperText={passwordError}
            />
            <Button
                variant="contained"
                color="primary"
                block={true}
                className={classes.loginButton}
                type="submit"
            >
                Login
            </Button>
        </form>
    );
};

Form.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    usernameError: PropTypes.string,
    passwordError: PropTypes.string
};

export default Form;