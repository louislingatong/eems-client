import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
// styles
import styles from '../../assets/jss/styles/components/custom-input/customInputStyle.js';

class CustomInput extends React.Component {
    render() {
        const {
            classes,
            formControlProps,
            labelText,
            id,
            labelProps,
            inputProps,
            error,
            helperText
        } = this.props;

        const underlineClasses = classNames({
            [classes.underlineError]: error,
            [classes.underline]: true
        });
        const marginTop = classNames({
            [classes.marginTop]: labelText === undefined
        });
        return (
            <FormControl
                {...formControlProps}
                className={formControlProps.className + ' ' + classes.formControl}
            >
                {labelText !== undefined ? (
                    <InputLabel
                        htmlFor={id}
                        {...labelProps}
                    >
                        {labelText}
                    </InputLabel>
                ) : null}
                <Input
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
                    <FormHelperText id={id}>{ helperText }</FormHelperText>
                ) : null}
            </FormControl>
        );
    }
}

CustomInput.propTypes = {
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    error: PropTypes.bool,
    helperText: PropTypes.string,
};

export default withStyles(styles)(CustomInput);