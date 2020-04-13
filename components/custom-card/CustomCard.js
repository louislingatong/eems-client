import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import styles from '../../assets/jss/styles/components/custom-card/customCardStyle.js';
// styles
import { withStyles } from '@material-ui/core/styles';

class CustomCard extends React.Component {
    render() {
        const { classes, className, children, plain, profile, chart, ...rest } = this.props;
        const cardClasses = classNames({
            [classes.card]: true,
            [classes.cardPlain]: plain,
            [classes.cardProfile]: profile,
            [classes.cardChart]: chart,
            [className]: className !== undefined
        });
        return (
            <div className={cardClasses} {...rest}>
                { children }
            </div>
        );
    }
}

CustomCard.propTypes = {
    className: PropTypes.string,
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    chart: PropTypes.bool,
    children: PropTypes.node
};

export default withStyles(styles)(CustomCard);