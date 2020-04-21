import React, { useEffect } from 'react';
import classNames from 'classnames';
import Router from 'next/router';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
// @material-ui/icons
import AccountBox from '@material-ui/icons/AccountBox';
import Notifications from '@material-ui/icons/Notifications';
// components
import CustomButton from '../../../components/button/Button';
// styles
import styles from '../../../assets/jss/styles/layouts/admin/headerMenuStyle';

const useStyles = makeStyles(styles);

const Menu = () => {
    const classes = useStyles();

    const [mobile, setMobile] = React.useState(null);
    const [profileOpen, setProfileOpen] = React.useState();
    const [notificationOpen, setNotificationOpen] = React.useState();
    const [windowSize, setWindowSize] = React.useState(0);

    useEffect(() => {
        if (mobile === null) {
            handleWindowResize();
            setWindowSize(window.innerWidth);
        }
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [windowSize]);

    const handleWindowResize = () => {
        if (window.innerWidth <= 960) {
            setMobile(true);
        } else {
            setMobile(false);
        }
        setWindowSize(window.innerWidth);
    };

    const handleClickProfile = (e) => {
        e.preventDefault();

        if (profileOpen && profileOpen.contains(e.target)) {
            setProfileOpen();
        } else {
            setProfileOpen(e.currentTarget);
        }
    };

    const handleCloseProfile = (e) => {
        e.preventDefault();
        setProfileOpen();
    };

    const handleClickNotification = (e) => {
        e.preventDefault();

        if (notificationOpen && notificationOpen.contains(e.target)) {
            setNotificationOpen();
        } else {
            setNotificationOpen(e.currentTarget);
        }
    };

    const handleCloseNotification = (e) => {
        e.preventDefault();
        setNotificationOpen();
    };

    const handleRedirect = (e, route) => {
        e.preventDefault();
        Router.push(route);
    };

    return (
        <div>
            <div className={classes.manager}>
                <CustomButton
                    color={mobile ? 'white' : 'transparent'}
                    justIcon={!mobile}
                    simple={mobile}
                    aria-owns={notificationOpen ? undefined : 'notification-menu-list-grow'}
                    aria-haspopup="true"
                    onClick={(e) => handleClickNotification(e)}
                    className={classes.buttonLink}
                >
                    <Notifications className={classes.linkIcon} />
                    <span className={classes.notifications}>1</span>
                    <Hidden mdUp implementation="css">
                        <p className={classes.linkText}>Notification</p>
                    </Hidden>
                </CustomButton>
                <Popper
                    open={Boolean(notificationOpen)}
                    anchorEl={notificationOpen}
                    transition
                    disablePortal
                    className={
                        classNames({ [classes.popperClose]: !notificationOpen }) +
                        ' ' +
                        classes.popperNav
                    }
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="notification-menu-list-grow"
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom'
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={(e) => handleCloseNotification(e)}>
                                    <MenuList role="menu">
                                        <MenuItem
                                            onClick={(e) => handleCloseNotification(e)}
                                            className={classes.dropdownItem}
                                        >
                                            Notification 1
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
            <div className={classes.manager}>
                <CustomButton
                    color={mobile ? 'white' : 'transparent'}
                    justIcon={!mobile}
                    simple={mobile}
                    aria-owns={profileOpen ? undefined : 'account-menu-list-grow'}
                    aria-haspopup="true"
                    onClick={(e) => handleClickProfile(e)}
                    className={classes.buttonLink}
                >
                    <AccountBox className={classes.linkIcon}/>
                    <Hidden mdUp implementation="css">
                        <p className={classes.linkText}>My Account</p>
                    </Hidden>
                </CustomButton>
                <Popper
                    open={Boolean(profileOpen)}
                    anchorEl={profileOpen}
                    transition
                    disablePortal
                    className={
                        classNames({ [classes.popperClose]: !profileOpen }) +
                        ' ' +
                        classes.popperNav
                    }
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="account-menu-list-grow"
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom'
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={(e) => handleCloseProfile(e)}>
                                    <MenuList role="menu">
                                        <MenuItem
                                            onClick={(e) => handleRedirect(e, '/profile')}
                                            className={classes.dropdownItem}
                                        >
                                            Profile
                                        </MenuItem>
                                        <Divider light />
                                        <MenuItem
                                            onClick={(e) => handleRedirect(e, '/logout')}
                                            className={classes.dropdownItem}
                                        >
                                            Logout
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
};

export default Menu;