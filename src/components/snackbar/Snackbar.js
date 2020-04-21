import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MatSnackbar from '@material-ui/core/Snackbar';
import MatIconButton from '@material-ui/core/IconButton';
// @material-ui/icons
import Close from '@material-ui/icons/Close';
// styles
import styles from '../../assets/jss/styles/components/snackbar/snackbarStyle.js';

const useStyles = makeStyles(styles);

const Snackbar = props => {
    const {
        message,
        color,
        icon,
        place,
        isOpen,
        duration,
        onClose,
        autoClose,
    } = props;
    const classes = useStyles();

    const messageClasses = classNames({
        [classes.iconMessage]: icon !== undefined
    });

    return (
        <MatSnackbar
            anchorOrigin={{
                vertical: place.indexOf('t') === -1 ? 'bottom' : 'top',
                horizontal: place.indexOf('l') !== -1 ? 'left' : place.indexOf('c') !== -1 ? 'center' : 'right'
            }}
            open={isOpen}
            autoHideDuration={duration}
            message={
                <div>
                    {icon !== undefined ? <props.icon className={classes.icon} /> : null}
                    <span className={messageClasses}>{message}</span>
                </div>
            }
            action={[
                <MatIconButton
                    className={classes.iconButton}
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={(e) => onClose(e)}
                >
                    <Close className={classes.close} />
                </MatIconButton>
            ]}
            onClose={(e) => autoClose ? onClose(e) : null}
            ContentProps={{
                classes: {
                    root: classes.root + ' ' + classes[color],
                    message: classes.message,
                }
            }}
        />
    );
};

Snackbar.propTypes = {
    message: PropTypes.node.isRequired,
    color: PropTypes.oneOf([
        'info',
        'success',
        'warning',
        'danger',
        'primary'
    ]),
    icon: PropTypes.object,
    place: PropTypes.oneOf([
        'tl',
        'tr',
        'tc',
        'br',
        'bl',
        'bc'
    ]),
    isOpen: PropTypes.bool,
    duration: PropTypes.number,
    onClose: PropTypes.func,
    autoClose: PropTypes.bool
};


export default Snackbar;