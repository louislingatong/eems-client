import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// styles
import styles from '../../assets/jss/styles/components/custom-card/cardStyle.js';

const useStyles = makeStyles(styles);

const Card = props => {
    const { className, children, plain, profile, chart, ...rest } = props;
    const classes = useStyles();

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
};

Card.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    chart: PropTypes.bool
};

export default Card;