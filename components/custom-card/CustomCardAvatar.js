import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
// styles
import styles from '../../assets/jss/styles/components/custom-card/customCardAvatarStyle.js';

class CustomCardAvatar extends React.Component {
    render() {
        const { classes, children, className, plain, profile, ...rest } = this.props;
        const cardAvatarClasses = classNames({
            [classes.cardAvatar]: true,
            [classes.cardAvatarProfile]: profile,
            [classes.cardAvatarPlain]: plain,
            [className]: className !== undefined
        });
        return (
            <div className={cardAvatarClasses} {...rest}>
                { children }
            </div>
        );
    }
}

CustomCardAvatar.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    profile: PropTypes.bool,
    plain: PropTypes.bool
};

export default withStyles(styles)(CustomCardAvatar);