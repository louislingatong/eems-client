import {
    defaultFont,
    primaryColor,
    primaryBoxShadow,
    whiteColor,
    grayColor,
    dangerColor,
} from '../../../../material-dashboard-react.js';

const userMenuStyle = theme => ({
    manager: {
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        display: 'inline-block'
    },
    buttonLink: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            margin: '10px 15px 0',
            width: '-webkit-fill-available',
            '& svg': {
                width: '24px',
                height: '30px',
                marginRight: '15px',
                marginLeft: '-15px'
            },
            '& .fab,& .fas,& .far,& .fal,& .material-icons': {
                fontSize: '24px',
                lineHeight: '30px',
                width: '24px',
                height: '30px',
                marginRight: '15px',
                marginLeft: '-15px'
            },
            '& > span': {
                justifyContent: 'flex-start',
                width: '100%'
            }
        }
    },
    linkIcon: {
    },
    linkText: {
        zIndex: '4',
        ...defaultFont,
        fontSize: '14px',
        margin: '0px'
    },
    popperClose: {
        pointerEvents: 'none'
    },
    popperNav: {
        [theme.breakpoints.down('sm')]: {
            position: 'static !important',
            left: 'unset !important',
            top: 'unset !important',
            transform: 'none !important',
            willChange: 'unset !important',
            '& > div': {
                boxShadow: 'none !important',
                marginLeft: '0rem',
                marginRight: '0rem',
                transition: 'none !important',
                marginTop: '0px !important',
                marginBottom: '0px !important',
                padding: '0px !important',
                backgroundColor: 'transparent !important',
                '& ul li': {
                    color: whiteColor + ' !important',
                    margin: '10px 15px 0!important',
                    padding: '10px 15px !important',
                    '&:hover': {
                        backgroundColor: 'hsla(0,0%,78%,.2)',
                        boxShadow: 'none'
                    }
                }
            }
        }
    },
    dropdownItem: {
        ...defaultFont,
        fontSize: '13px',
        padding: '10px 20px',
        margin: '0 5px',
        borderRadius: '2px',
        WebkitTransition: 'all 150ms linear',
        MozTransition: 'all 150ms linear',
        OTransition: 'all 150ms linear',
        MsTransition: 'all 150ms linear',
        transition: 'all 150ms linear',
        display: 'block',
        clear: 'both',
        fontWeight: '400',
        lineHeight: '1.42857143',
        color: grayColor[8],
        whiteSpace: 'nowrap',
        height: 'unset',
        minHeight: 'unset',
        '&:hover': {
            backgroundColor: primaryColor[0],
            color: whiteColor,
            ...primaryBoxShadow
        }
    },
    notifications: {
        zIndex: '4',
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            top: '2px',
            border: '1px solid ' + whiteColor,
            right: '4px',
            fontSize: '9px',
            background: dangerColor[0],
            color: whiteColor,
            minWidth: '16px',
            height: '16px',
            borderRadius: '10px',
            textAlign: 'center',
            lineHeight: '16px',
            verticalAlign: 'middle',
            display: 'block'
        },
        [theme.breakpoints.down('sm')]: {
            ...defaultFont,
            fontSize: '14px',
            marginRight: '8px'
        }
    },
});

export default userMenuStyle;