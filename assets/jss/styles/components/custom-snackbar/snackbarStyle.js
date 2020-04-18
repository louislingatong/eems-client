import {
    defaultFont,
    primaryBoxShadow,
    infoBoxShadow,
    successBoxShadow,
    warningBoxShadow,
    dangerBoxShadow,
    roseBoxShadow,
    whiteColor,
    infoColor,
    successColor,
    dangerColor,
    roseColor,
    primaryColor,
    warningColor,
} from '../../../material-dashboard-react.js';

const customSnackbarStyle = {
    root: {
        ...defaultFont,
    },
    icon: {
        display: 'block',
        left: '15px',
        position: 'absolute',
        top: '50%',
        marginTop: '-15px',
        width: '30px',
        height: '30px'
    },
    iconButton: {
        width: '24px',
        height: '24px',
        padding: '0px'
    },
    iconMessage: {
        paddingLeft: '50px',
        display: 'block',
        fontSize: '12px'
    },
    close: {
        width: '11px',
        height: '11px'
    },
    message: {
        padding: '0',
        display: 'block',
        maxWidth: '100%'
    },
    info: {
        backgroundColor: infoColor[3],
        color: whiteColor,
        ...infoBoxShadow
    },
    success: {
        backgroundColor: successColor[3],
        color: whiteColor,
        ...successBoxShadow
    },
    warning: {
        backgroundColor: warningColor[3],
        color: whiteColor,
        ...warningBoxShadow
    },
    danger: {
        backgroundColor: dangerColor[3],
        color: whiteColor,
        ...dangerBoxShadow
    },
    primary: {
        backgroundColor: primaryColor[3],
        color: whiteColor,
        ...primaryBoxShadow
    },
    rose: {
        backgroundColor: roseColor[3],
        color: whiteColor,
        ...roseBoxShadow
    },
};

export default customSnackbarStyle;
