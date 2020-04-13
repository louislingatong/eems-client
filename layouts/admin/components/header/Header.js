import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// styles
import styles from '../../../../assets/jss/styles/layouts/components/header/headerStyle.js';
// component
import SubMenu from '../sub-menu/index';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, color, handleDrawerToggle } = this.props;
        return (
            <AppBar
                className={classes.appBar + classNames({
                    [' ' + classes[color]]: color
                })}>
                <Toolbar className={classes.container}>
                    <div className={classes.flex}>
                        {/* Header Name */}
                        <a className={classes.title} >
                            Dashboard
                        </a>
                    </div>
                    <Hidden smDown implementation="css">
                        <SubMenu />
                    </Hidden>
                    <Hidden mdUp implementation="css">
                        <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}>
                            <Menu />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
        );
    }
}

Header.propTypes = {
    color: PropTypes.oneOf([
        'primary',
        'info',
        'success',
        'warning',
        'danger'
    ]),
    handleDrawerToggle: PropTypes.func,
};

export default withStyles(styles)(Header);
