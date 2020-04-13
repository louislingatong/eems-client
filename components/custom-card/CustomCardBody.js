import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
// styles
import styles from '../../assets/jss/styles/components/custom-card/customCardBodyStyle.js';

class CustomCardBody extends React.Component {
    render() {
        const { classes, className, children, plain, profile, ...rest } = this.props;
        const cardBodyClasses = classNames({
            [classes.cardBody]: true,
            [classes.cardBodyPlain]: plain,
            [classes.cardBodyProfile]: profile,
            [className]: className !== undefined
        });
        return (
            <div className={cardBodyClasses} {...rest}>
                { children }
            </div>
        );
    }
}

CustomCardBody.propTypes = {
    className: PropTypes.string,
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    children: PropTypes.node
};

export default withStyles(styles)(CustomCardBody);