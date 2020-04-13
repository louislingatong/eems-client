import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/styles/components/custom-card/customCardIconStyle.js';

class CustomCardIcon extends React.Component {
    render() {
        const { classes, className, children, color, ...rest } = this.props;
        const cardIconClasses = classNames({
            [classes.cardIcon]: true,
            [classes[color + 'CardHeader']]: color,
            [className]: className !== undefined
        });
        return (
            <div className={cardIconClasses} {...rest}>
                { children }
            </div>
        );
    }
}

CustomCardIcon.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf([
        'warning',
        'success',
        'danger',
        'info',
        'primary',
        'rose'
    ]),
    children: PropTypes.node
};

export default withStyles(styles)(CustomCardIcon);