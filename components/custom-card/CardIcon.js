import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// styles
import styles from '../../assets/jss/styles/components/custom-card/cardIconStyle.js';

const useStyles = makeStyles(styles);

const CardIcon = props => {
    const { className, children, color, ...rest } = props;
    const classes = useStyles();

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
};

CardIcon.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    color: PropTypes.oneOf([
        'warning',
        'success',
        'danger',
        'info',
        'primary',
        'rose'
    ])
};

export default CardIcon;