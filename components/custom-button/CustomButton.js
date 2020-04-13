import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// styles
import styles from '../../assets/jss/styles/components/custom-button/customButtonStyle.js';

class CustomButton extends React.Component {
    render() {
        const {
            classes,
            color,
            round,
            children,
            disabled,
            simple,
            size,
            block,
            link,
            justIcon,
            className,
            muiClasses,
            ...rest
        } = this.props;
        const btnClasses = classNames({
            [classes.button]: true,
            [classes[size]]: size,
            [classes[color]]: color,
            [classes.round]: round,
            [classes.disabled]: disabled,
            [classes.simple]: simple,
            [classes.block]: block,
            [classes.link]: link,
            [classes.justIcon]: justIcon,
            [className]: className
        });
        return (
            <Button {...rest} classes={muiClasses} className={btnClasses}>
                {children}
            </Button>
        );
    }
}

CustomButton.propTypes = {
    color: PropTypes.oneOf([
        'primary',
        'info',
        'success',
        'warning',
        'danger',
        'rose',
        'white',
        'transparent'
    ]),
    size: PropTypes.oneOf([
        'sm',
        'lg'
    ]),
    simple: PropTypes.bool,
    round: PropTypes.bool,
    disabled: PropTypes.bool,
    block: PropTypes.bool,
    link: PropTypes.bool,
    justIcon: PropTypes.bool,
    className: PropTypes.string,
    // use this to pass the classes props from Material-UI
    muiClasses: PropTypes.object,
    children: PropTypes.node
};

export default withStyles(styles)(CustomButton);