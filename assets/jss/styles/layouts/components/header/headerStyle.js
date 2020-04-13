import {
    container,
    defaultFont,
    grayColor
} from '../../../../material-dashboard-react.js';

const headerStyle = () => ({
    appBar: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderBottom: '0',
        marginBottom: '0',
        position: 'absolute',
        width: '100%',
        paddingTop: '10px',
        zIndex: '1029',
        color: grayColor[7],
        border: '0',
        borderRadius: '3px',
        padding: '10px 0',
        transition: 'all 150ms ease 0s',
        minHeight: '50px',
        display: 'block'
    },
    container: {
        ...container,
        minHeight: '50px'
    },
    flex: {
        flex: 1
    },
    title: {
        ...defaultFont,
        letterSpacing: 'unset',
        lineHeight: '30px',
        fontSize: '18px',
        borderRadius: '3px',
        textTransform: 'none',
        color: 'inherit',
        margin: '0',
        '&:hover,&:focus': {
            background: 'transparent'
        }
    }
});

export default headerStyle;
