import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MatButton from '@material-ui/core/Button';
// styles
import styles from '../../assets/jss/styles/components/button/buttonStyle.js';

const useStyles = makeStyles(styles);

const Button = props => {
    const {
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
    } = props;
    const classes = useStyles();

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
        <MatButton {...rest} classes={muiClasses} className={btnClasses}>
            {children}
        </MatButton>
    );
};

Button.propTypes = {
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

export default Button;