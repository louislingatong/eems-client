import Link from 'next/link';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// styles
import styles from '../../../../assets/jss/styles/layouts/components/footer/footerStyle.js';

const useStyles = makeStyles(styles);

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.left}>
                    <List className={classes.list}>
                        <ListItem className={classes.inlineBlock}>
                            <Link href="/dashboard">
                                <a className={classes.block}>
                                    Dashboard
                                </a>
                            </Link>
                        </ListItem>
                    </List>
                </div>
                <p className={classes.right}>
                    <span>
                        &copy; {1900 + new Date().getYear()}{' '}
                        <a
                            href="https://www.creative-tim.com?ref=mdr-footer"
                            target="_blank"
                            className={classes.a}
                        >
                            LOUIS LINGATONG
                        </a>
                        , Senior Software Engineer
                    </span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
