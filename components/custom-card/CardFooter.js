import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// styles
import styles from '../../assets/jss/styles/components/custom-card/cardFooterStyle.js';

const useStyles = makeStyles(styles);

const CardFooter = props => {
    const { className, children, plain, profile, stats, chart, ...rest } = props;
    const classes = useStyles();

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
};

CardFooter.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    stats: PropTypes.bool,
    chart: PropTypes.bool
};

export default CardFooter;