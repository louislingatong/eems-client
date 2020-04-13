import {
    grayColor,
    dangerColor,
} from '../../material-dashboard-react.js';

const loginStyle = () => ({
    wrapper: {
        zIndex: '2',
        position: 'relative',
        paddingTop: '20vh',
        paddingBottom: '200px',
        color: '#FFFFFF'
    },
    header: {
        width: 'auto',
        textAlign: 'center',
        marginLeft: '20px',
        marginRight: '20px',
        marginTop: '-40px',
        padding: '20px 0',
        marginBottom: '15px'
    },
    title: {
        marginTop: '0px',
        marginBottom: '0px',
        fontWeight: '400',
        fontSize: '18px',
        textDecoration: 'none'
    },
    subTitle: {
        marginTop: '0px',
        marginBottom: '0px',
        fontSize: '10px',
    },
    divider: {
        marginTop: '20px',
        marginBottom: '0px',
        textAlign: 'center'
    },
    footer: {
        paddingTop: '0rem',
        border: '0',
        borderRadius: '6px',
        justifyContent: 'center !important'
    },
    inputIconsColor: {
        color: grayColor[0]
    },
    inputIconsColorDanger: {
        color: dangerColor[0]
    },
    loginButton: {
        marginTop: '20px',
        marginBottom: '0px',
    }
});

export default loginStyle;