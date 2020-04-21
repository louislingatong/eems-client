import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MatFormControl from '@material-ui/core/FormControl';
import MatFormHelperText from '@material-ui/core/FormHelperText';
import MatInputLabel from '@material-ui/core/InputLabel';
import MatInput from '@material-ui/core/Input';
// styles
import styles from '../../assets/jss/styles/components/input/inputStyle.js';

const useStyles = makeStyles(styles);

const Input = props => {
    const {
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        error,
        helperText
    } = props;
    const classes = useStyles();

    const underlineClasses = classNames({
        [classes.underlineError]: error,
        [classes.underline]: true
    });
    const marginTop = classNames({
        [classes.marginTop]: labelText === undefined
    });
    return (
        <MatFormControl
            {...formControlProps}
            className={formControlProps.className + ' ' + classes.formControl}
        >
            {labelText !== undefined ? (
                <MatInputLabel
                    htmlFor={id}
                    {...labelProps}
                >
                    {labelText}
                </MatInputLabel>
            ) : null}
            <MatInput
                classes={{
                    root: marginTop,
                    disabled: classes.disabled,
                    underline: underlineClasses
                }}
                id={id}
                aria-describedby={id}
                {...inputProps}
            />

            {error ? (
                <MatFormHelperText id={id}>{ helperText }</MatFormHelperText>
            ) : null}
        </MatFormControl>
    );
};

Input.propTypes = {
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    error: PropTypes.bool,
    helperText: PropTypes.string,
};

export default Input;