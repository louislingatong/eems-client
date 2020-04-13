import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
// styles
import styles from '../../assets/jss/styles/components/custom-card/customCardFooterStyle.js';

class CustomCardFooter extends React.Component {
    render() {
        const { classes, className, children, plain, profile, stats, chart, ...rest } = this.props;
        const cardFooterClasses = classNames({
            [classes.cardFooter]: true,
            [classes.cardFooterPlain]: plain,
            [classes.cardFooterProfile]: profile,
            [classes.cardFooterStats]: stats,
            [classes.cardFooterChart]: chart,
            [className]: className !== undefined
        });
        return (
            <div className={cardFooterClasses} {...rest}>
                { children }
            </div>
        );
    }
}

CustomCardFooter.propTypes = {
    className: PropTypes.string,
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    stats: PropTypes.bool,
    chart: PropTypes.bool,
    children: PropTypes.node
};

export default withStyles(styles)(CustomCardFooter);