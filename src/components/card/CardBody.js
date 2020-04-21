import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// styles
import styles from '../../assets/jss/styles/components/card/cardBodyStyle.js';

const useStyles = makeStyles(styles);

const CardBody = props => {
    const { className, children, plain, profile, ...rest } = props;
    const classes = useStyles();

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
};

CardBody.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    plain: PropTypes.bool,
    profile: PropTypes.bool
};

export default CardBody;