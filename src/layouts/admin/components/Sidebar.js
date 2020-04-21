import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useRouter } from 'next/router';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
// components
import HeaderMenu from './HeaderMenu';
// styles
import styles from '../../../assets/jss/styles/layouts/admin/sidebarStyle.js';

const useStyles = makeStyles(styles);

const Sidebar = props => {
    const { handleDrawerToggle, open, bgImage, appLogo, appName, color } = props;
    const classes = useStyles();
    const router = useRouter();

    const drawerClasses = {
        paper: classNames(classes.drawerPaper)
    };

    const handleClick = (e, action, route) => {
        e.preventDefault();
        router.push(route);
    };

    const handleActiveRoute = (e, route) => {
        e.preventDefault();
        return router.pathname === route;
    };

    const links = (
        <List className={classes.list}>
            <ListItem
                button
                className={classes.itemLink + classNames({
                    [' ' + classes[color]]: (e) => handleActiveRoute(e, '/dashboard')
                })}
                onClick={(e) => handleClick(e, '/dashboard')}
            >
                <Icon className={classNames(
                    classes.itemIcon,
                    classNames({
                        [' ' + classes.whiteFont]: (e) => handleActiveRoute(e, '/dashboard')
                    })
                )}>
                    dashboard
                </Icon>
                <ListItemText
                    primary="Dashboard"
                    className={classNames(
                        classes.itemText,
                        classNames({
                            [' ' + classes.whiteFont]: (e) => handleActiveRoute(e, '/dashboard')
                        })
                    )}
                    disableTypography={true}
                />
            </ListItem>
        </List>
    );

    return (
        <div>
            <Hidden mdUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={open}
                    classes={drawerClasses}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                >
                    <div className={classes.logo}>
                        <a
                            className={classes.logoLink}
                            target="_blank"
                        >
                            <div className={classes.logoImage}>
                                <img src={appLogo} alt="logo" className={classes.img} />
                            </div>
                            {appName}
                        </a>
                    </div>
                    <div className={classes.sidebarWrapper}>
                        <HeaderMenu />
                        { links }
                    </div>
                    <div
                        className={classes.background}
                        style={{ backgroundImage: 'url(' + bgImage + ')' }}
                    />
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    anchor="left"
                    variant="permanent"
                    open
                    classes={drawerClasses}
                >
                    <div className={classes.logo}>
                        <a
                            href="https://www.creative-tim.com?ref=mdr-sidebar"
                            className={classes.logoLink}
                            target="_blank"
                        >
                            <div className={classes.logoImage}>
                                <img src={appLogo} alt="logo" className={classes.img} />
                            </div>
                            {appName}
                        </a>
                    </div>
                    <div className={classes.sidebarWrapper}>
                        { links }
                    </div>
                    <div
                        className={classes.background}
                        style={{ backgroundImage: 'url(' + bgImage + ')' }}
                    />
                </Drawer>
            </Hidden>
        </div>
    );
};

Sidebar.propTypes = {
    handleDrawerToggle: PropTypes.func,
    open: PropTypes.bool,
    appLogo: PropTypes.string,
    appName: PropTypes.string,
    bgImage: PropTypes.string,
    color: PropTypes.oneOf([
        'purple',
        'blue',
        'green',
        'orange',
        'red'
    ]),
};

export default Sidebar;
