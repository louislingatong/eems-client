import React from 'react';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/styles/layouts/adminStyle.js';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import '../../scss/styles.scss';
// components
import Header from './components/header';
import Footer from './components/footer';
import Sidebar from './components/sidebar';

const mainPanel = React.createRef();
let ps;

class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fixedClasses: 'dropdown show',
            sideMenuOpen: false,
        };

        this.windowResize = this.windowResize.bind(this);
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    }

    componentDidMount() {
        if (navigator.platform.indexOf('Win') > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = 'hidden';
        }

        window.addEventListener('resize', this.windowResize);
    }

    componentWillUnmount() {
        if (navigator.platform.indexOf('Win') > -1) {
            ps.destroy;
        }

        window.removeEventListener('resize', this.windowResize);
    }

    windowResize() {
        if (window.innerWidth >= 960) {
            this.setState({
                sideMenuOpen: false
            });
        }
    }

    handleDrawerToggle() {
        this.setState({
            sideMenuOpen: !this.state.sideMenuOpen
        });
    }

    render() {
        const { classes, app } = this.props;
        const { sideMenuOpen } = this.state;

        return (
            <div className={classes.wrapper}>
                <Sidebar
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={sideMenuOpen}
                    appLogo={app.logo}
                    appName={app.acronym}
                    bgImage={app.bgImage}
                    color={app.color}
                />
                <div className={classes.mainPanel} ref={mainPanel}>
                    <Header handleDrawerToggle={this.handleDrawerToggle}/>
                    <div className={classes.content}>
                        <div className={classes.container}>

                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Page);
