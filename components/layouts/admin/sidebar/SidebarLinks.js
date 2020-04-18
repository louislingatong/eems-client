import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useRouter } from 'next/router';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
// styles
import styles from '../../../../assets/jss/styles/layouts/components/sidebar/sidebarStyle.js';

const useStyles = makeStyles(styles);

const SidebarLinks = props => {
    const { color } = props;
    const classes = useStyles();
    const router = useRouter();

    const handleClick = (e, action, route) => {
        e.preventDefault();
        router.push(route);
    };

    const handleActiveRoute = (e, route) => {
        e.preventDefault();
        return router.pathname === route;
    };

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
};

SidebarLinks.propTypes = {
    color: PropTypes.oneOf([
        'purple',
        'blue',
        'green',
        'orange',
        'red'
    ])
};

export default SidebarLinks;