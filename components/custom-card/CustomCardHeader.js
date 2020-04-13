import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
// styles
import styles from '../../assets/jss/styles/components/custom-card/customCardHeaderStyle.js';

class CustomCardHeader extends React.Component {
    render() {
        const { classes, className, children, color, plain, stats, icon, ...rest } = this.props;
        const cardHeaderClasses = classNames({
            [classes.cardHeader]: true,
            [classes[color + 'CardHeader']]: color,
            [classes.cardHeaderPlain]: plain,
            [classes.cardHeaderStats]: stats,
            [classes.cardHeaderIcon]: icon,
            [className]: className !== undefined
        });
        return (
            <div className={cardHeaderClasses} {...rest}>
                { children }
            </div>
        );
    }
}

CustomCardHeader.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf([
        'warning',
        'success',
        'danger',
        'info',
        'primary',
        'rose'
    ]),
    plain: PropTypes.bool,
    stats: PropTypes.bool,
    icon: PropTypes.bool,
    children: PropTypes.node
};

export default withStyles(styles)(CustomCardHeader);