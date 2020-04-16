import React from 'react';
import { connect } from 'react-redux';
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
import CustomButton from '../../../custom-button/CustomButton';
// services
import { logout } from '../../../../services/authService';
// actions
import { authLogout } from '../../../../store/actions/authActions';

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
        if (window.innerWidth <= 960) {
            this.setState({
                isMobile: true
            });
        }

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
        logout().then(() => {
            this.props.logout();
            Router.push('/login');
        });
    }

    render() {
        const { classes, auth } = this.props;
        const { openProfile, openNotification, isMobile } = this.state;
        return (
            <div>
                <div className={classes.manager}>
                    <CustomButton
                        color={isMobile ? 'white' : 'transparent'}
                        justIcon={!isMobile}
                        simple={isMobile}
                        aria-owns={openNotification ? null : 'notification-menu-list-grow'}
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
                                id="notification-menu-list-grow"
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
                        aria-owns={openProfile ? null : 'account-menu-list-grow'}
                        aria-haspopup="true"
                        onClick={(e) => this.handleClickProfile(e)}
                        className={classes.buttonLink}
                    >
                        <AccountBox className={classes.linkIcon}/>
                        <Hidden mdUp implementation="css">
                            <p className={classes.linkText}>{ auth.me ? auth.me.name : ''}</p>
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
                                id="account-menu-list-grow"
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom'
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={(e) => this.handleCloseProfile(e)}>
                                        <MenuList role="menu">
                                            <MenuItem
                                                onClick={(e) => this.handleRedirect(e, `/profile/${ auth.me ? auth.me.id : ''}`)}
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

const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(authLogout());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Menu));