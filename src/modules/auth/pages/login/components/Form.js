import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
// components
import Input from '../../../../../components/input/Input';
import Button from '../../../../../components/button/Button';
// styles
import styles from '../../../../../assets/jss/styles/modules/loginStyle';

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