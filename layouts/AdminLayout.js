import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import '../scss/styles.scss';
// components
import Header from '../components/layouts/admin/header/Header';
import Footer from '../components/layouts/admin/footer/Footer';
import Sidebar from '../components/layouts/admin/sidebar/Sidebar';
// styles
import styles from '../assets/jss/styles/layouts/adminLayoutStyle.js';

const useStyles = makeStyles(styles);

let ps;

const Layout = props => {
    const { app } = props;
    const mainPanel = React.createRef();
    const classes = useStyles();

    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    useEffect(() => {
        if (navigator.platform.indexOf('Win') > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = 'hidden';
        }
        window.addEventListener('resize', windowResize);

        if (navigator.platform.indexOf('Win') > -1) {
            ps.destroy;
        }
        window.removeEventListener('resize', windowResize);
    }, [mainPanel]);

    const windowResize = () => {
        if (window.innerWidth >= 960) {
            setSidebarOpen(false);
        }
    };

    const handleDrawerToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className={classes.wrapper}>
            <Sidebar
                handleDrawerToggle={handleDrawerToggle}
                open={sidebarOpen}
                appLogo={app.logo}
                appName={app.acronym}
                bgImage={app.bgImage}
                color={app.color}
            />
            <div className={classes.mainPanel} ref={mainPanel}>
                <Header handleDrawerToggle={handleDrawerToggle}/>
                <div className={classes.content}>
                    <div className={classes.container}>

                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        app: state.app
    };
};

export default connect(mapStateToProps)(Layout);
