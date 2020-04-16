import {
    defaultFont,
    grayColor
} from '../../../material-dashboard-react.js';

const forgotPasswordModalStyle = {
    modal: {
        ...defaultFont,
        borderRadius: '6px'
    },
    modalHeader: {
        borderBottom: 'none',
        paddingTop: '24px',
        paddingRight: '24px',
        paddingBottom: '0',
        paddingLeft: '24px',
        minHeight: '16.43px'
    },
    modalTitle: {
        margin: '0',
        fontWeight: '400',
        fontSize: '15px',
    },
    modalCloseButton: {
        color: '#999999',
        WebkitAppearance: 'none',
        padding: '0',
        cursor: 'pointer',
        background: '0 0',
        border: '0',
        fontSize: 'inherit',
        opacity: '.9',
        textShadow: 'none',
        fontWeight: '700',
        lineHeight: '1',
        float: 'right'
    },
    modalClose: {
        width: '16px',
        height: '16px'
    },
    modalBody: {
        paddingTop: '16px',
        paddingRight: '24px',
        paddingBottom: '16px',
        paddingLeft: '24px',
        position: 'relative'
    },
    modalFooter: {
        padding: '15px',
        textAlign: 'right',
        paddingTop: '0',
        margin: '0'
    },
    modalFooterCenter: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    inputIconsColor: {
        color: grayColor[0]
    },
};

export default forgotPasswordModalStyle;
