import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
// styles
import styles from '../../../../assets/jss/styles/layouts/components/sidebar/sidebarStyle.js';
// components
import SidebarLinks from './SidebarLinks';
import SubMenu from '../sub-menu/SubMenu';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes, handleDrawerToggle, open, bgImage, appLogo, appName, color } = this.props;
        const drawerClasses = {
            paper: classNames(classes.drawerPaper)
        };
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
                            <SubMenu />
                            <SidebarLinks color={color}/>
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
                            <SidebarLinks color={color}/>
                        </div>
                        <div
                            className={classes.background}
                            style={{ backgroundImage: 'url(' + bgImage + ')' }}
                        />
                    </Drawer>
                </Hidden>
            </div>
        );
    }
}

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

export default withStyles(styles)(Sidebar);
