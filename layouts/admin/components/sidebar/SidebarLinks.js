import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Router from 'next/router';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
// styles
import styles from '../../../../assets/jss/styles/layouts/components/sidebar/sidebarStyle.js';
// services
import { logout } from '../../../../services/authService';

class SidebarLinks extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleActiveRoute = this.handleActiveRoute.bind(this);
    }


    handleClick(e, action, route) {
        e.preventDefault();

        if (action === 'logout') {
            this.props.dispatch(logout());
        } else if (action === 'redirect' && route) {
            Router.push(route);
        }
    }

    handleActiveRoute(e, route) {
        e.preventDefault();

        return window.location.href.indexOf(route) > -1 ? true : false;
    }

    render() {
        const { classes, color } = this.props;

        return (
            <React.Fragment>
                <List className={classes.list}>
                    <ListItem
                        button
                        className={classes.itemLink + classNames({
                            [' ' + classes[color]]: (e) => this.handleActiveRoute(e, '/dashboard')
                        })}
                        onClick={(e) => this.handleClick(e, 'redirect', '/dashboard')}
                    >
                        <Icon className={classNames(
                            classes.itemIcon,
                            classNames({
                                [' ' + classes.whiteFont]: (e) => this.handleActiveRoute(e, '/dashboard')
                            })
                        )}>
                            dashboard
                        </Icon>
                        <ListItemText
                            primary="Dashboard"
                            className={classNames(
                                classes.itemText,
                                classNames({
                                    [' ' + classes.whiteFont]: (e) => this.handleActiveRoute(e, '/dashboard')
                                })
                            )}
                            disableTypography={true}
                        />
                    </ListItem>
                </List>
            </React.Fragment>
        );
    }
}

SidebarLinks.propTypes = {
    color: PropTypes.oneOf([
        'purple',
        'blue',
        'green',
        'orange',
        'red'
    ])
};

export default withStyles(styles)(SidebarLinks);