import React from 'react';
import classNames from 'classnames';
import Router from 'next/router';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
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
// styles
import styles from '../../../../assets/jss/styles/layouts/components/sub-menu/subMenuStyle.js';
// components
import CustomButton from '../../../../components/custom-button/CustomButton';
// services
import { logout } from '../../../../services/authService';

class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isMobile: false,
            openProfile: null,
            openNotification: null
        };

        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleClickProfile = this.handleClickProfile.bind(this);
        this.handleCloseProfile = this.handleCloseProfile.bind(this);
        this.handleClickNotification = this.handleClickNotification.bind(this);
        this.handleCloseNotification = this.handleCloseNotification.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize() {
        if (window.innerWidth <= 960) {
            this.setState({
                isMobile: true
            });
        } else {
            this.setState({
                isMobile: false
            });
        }
    }

    handleClickProfile(e) {
        e.preventDefault();
        const { openProfile } = this.state;

        if (openProfile && openProfile.contains(e.target)) {
            this.setState({
                openProfile: null
            });
        } else {
            this.setState({
                openProfile: e.currentTarget
            });
        }
    }

    handleCloseProfile(e) {
        e.preventDefault();
        this.setState({
            openProfile: null
        });
    }

    handleClickNotification(e) {
        e.preventDefault();
        const { openNotification } = this.state;

        if (openNotification && openNotification.contains(e.target)) {
            this.setState({
                openNotification: null
            });
        } else {
            this.setState({
                openNotification: e.currentTarget
            });
        }
    }

    handleCloseNotification(e) {
        e.preventDefault();
        this.setState({
            openNotification: null
        });
    }

    handleRedirect(e, route) {
        e.preventDefault();
        Router.push(route);
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.dispatch(logout());
    }

    render() {
        const { classes } = this.props;
        const { openProfile, openNotification, isMobile } = this.state;
        return (
            <div>
                <div className={classes.manager}>
                    <CustomButton
                        color={isMobile ? 'white' : 'transparent'}
                        justIcon={!isMobile}
                        simple={isMobile}
                        aria-owns={openNotification ? null : 'profile-sub-sub-menu-list-grow'}
                        aria-haspopup="true"
                        onClick={(e) => this.handleClickNotification(e)}
                        className={classes.buttonLink}
                    >
                        <Notifications className={classes.linkIcon} />
                        <span className={classes.notifications}>1</span>
                        <Hidden mdUp implementation="css">
                            <p className={classes.linkText}>Notification</p>
                        </Hidden>
                    </CustomButton>
                    <Popper
                        open={Boolean(openNotification)}
                        anchorEl={openNotification}
                        transition
                        disablePortal
                        className={
                            classNames({ [classes.popperClose]: !openNotification }) +
                            ' ' +
                            classes.popperNav
                        }
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="profile-menu-list-grow"
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom'
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={(e) => this.handleCloseNotification(e)}>
                                        <MenuList role="menu">
                                            <MenuItem
                                                onClick={(e) => this.handleCloseNotification(e)}
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
                        color={isMobile ? 'white' : 'transparent'}
                        justIcon={!isMobile}
                        simple={isMobile}
                        aria-owns={openProfile ? null : 'profile-sub-sub-menu-list-grow'}
                        aria-haspopup="true"
                        onClick={(e) => this.handleClickProfile(e)}
                        className={classes.buttonLink}
                    >
                        <AccountBox className={classes.linkIcon}/>
                        <Hidden mdUp implementation="css">
                            <p className={classes.linkText}>Admin</p>
                        </Hidden>
                    </CustomButton>
                    <Popper
                        open={Boolean(openProfile)}
                        anchorEl={openProfile}
                        transition
                        disablePortal
                        className={
                            classNames({ [classes.popperClose]: !openProfile }) +
                            ' ' +
                            classes.popperNav
                        }
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="profile-menu-list-grow"
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom'
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={(e) => this.handleCloseProfile(e)}>
                                        <MenuList role="menu">
                                            <MenuItem
                                                onClick={(e) => this.handleRedirect(e, '/profile')}
                                                className={classes.dropdownItem}
                                            >
                                                Profile
                                            </MenuItem>
                                            <Divider light />
                                            <MenuItem
                                                onClick={(e) => this.handleLogout(e)}
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
    }
}

export default withStyles(styles)(Menu);