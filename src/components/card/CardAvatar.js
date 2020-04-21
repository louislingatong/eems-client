import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// styles
import styles from '../../assets/jss/styles/components/card/cardAvatarStyle.js';

const useStyles = makeStyles(styles);

const CardAvatar = props => {
    const { className, children, plain, profile, ...rest } = props;
    const classes = useStyles();

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

CardAvatar.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    profile: PropTypes.bool,
    plain: PropTypes.bool
};

export default CardAvatar;