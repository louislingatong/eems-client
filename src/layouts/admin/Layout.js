import React, { useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import '../../../scss/styles.scss';
// components
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
// styles
import styles from '../../assets/jss/styles/layouts/admin/mainStyle.js';

import bg from '../../assets/img/bg.jpg';
import logo from '../../assets/img/logo.png';

const useStyles = makeStyles(styles);

let ps;

const withAdminLayout = Page => {
    const Layout = () => {
        const mainPanel = React.createRef();
        const classes = useStyles();

        const [sidebarOpen, setSidebarOpen] = React.useState(false);
        const [windowSize, setWindowSize] = React.useState(0);

        useEffect(() => {
            if (navigator.platform.indexOf('Win') > -1) {
                ps = new PerfectScrollbar(mainPanel.current, {
                    suppressScrollX: true,
                    suppressScrollY: false
                });
                document.body.style.overflow = 'hidden';
            }
            window.addEventListener('resize', windowResize);


            return () => {
                if (navigator.platform.indexOf('Win') > -1) {
                    ps.destroy;
                }
                window.removeEventListener('resize', windowResize);
            };
        }, [windowSize]);

        const windowResize = () => {
            if (window.innerWidth >= 960) {
                setSidebarOpen(false);
            }
            setWindowSize(window.innerWidth);
        };

        const handleDrawerToggle = () => {
            setSidebarOpen(!sidebarOpen);
        };

        return (
            <div className={classes.wrapper}>
                <Sidebar
                    handleDrawerToggle={handleDrawerToggle}
                    open={sidebarOpen}
                    appLogo={logo}
                    appName={process.env.APP_NAME_SHORT}
                    bgImage={bg}
                    color={'purple'}
                />
                <div className={classes.mainPanel} ref={mainPanel}>
                    <Header handleDrawerToggle={handleDrawerToggle}/>
                    <div className={classes.content}>
                        <Page className={classes.container}/>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    };

    return Layout;
};

export default withAdminLayout;
