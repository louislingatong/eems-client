import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// styles
import styles from '../../../assets/jss/styles/layouts/admin/headerStyle.js';
// components
import HeaderMenu from './HeaderMenu';

const useStyles = makeStyles(styles());

const Header = props => {
    const { handleDrawerToggle } = props;
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar}>
            <Toolbar className={classes.container}>
                <div className={classes.flex}>
                    {/* Header Name */}
                    <a className={classes.title} >
                        Dashboard
                    </a>
                </div>
                <Hidden smDown implementation="css">
                    <HeaderMenu />
                </Hidden>
                <Hidden mdUp implementation="css">
                    <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}>
                        <Menu />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {
    handleDrawerToggle: PropTypes.func,
};

export default Header;