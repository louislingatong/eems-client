import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/styles/components/custom-snackbar/customSnackbarStyle.js';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/icons
import Close from '@material-ui/icons/Close';

class CustomSnackbar extends React.Component {
    render() {
        const {
            classes,
            message,
            color,
            icon,
            place,
            isOpen,
            duration,
            onClose,
            autoClose,
        } = this.props;

        const messageClasses = classNames({
            [classes.iconMessage]: icon !== undefined
        });

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: place.indexOf('t') === -1 ? 'bottom' : 'top',
                    horizontal: place.indexOf('l') !== -1 ? 'left' : place.indexOf('c') !== -1 ? 'center' : 'right'
                }}
                open={isOpen}
                autoHideDuration={duration}
                message={
                    <div>
                        {icon !== undefined ? <this.props.icon className={classes.icon} /> : null}
                        <span className={messageClasses}>{message}</span>
                    </div>
                }
                action={[
                    <IconButton
                        className={classes.iconButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={(e) => onClose(e)}
                    >
                        <Close className={classes.close} />
                    </IconButton>
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
    }
}

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


export default withStyles(styles)(CustomSnackbar);