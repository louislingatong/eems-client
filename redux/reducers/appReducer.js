import {
    CHANGE_COLOR,
} from '../action-types/appActionTypes';

import bg from '../../assets/img/bg.jpg';
import logo from '../../assets/img/logo.png';

const initialState = {
    acronym: 'EEMS',
    name: 'Employee Engagement Management System',
    logo: logo,
    bgImage: bg,
    color: 'purple',
};

const settingsReducer = (state = initialState, {type, payload = null}) => {
    switch (type) {
    case CHANGE_COLOR:
        return setColor(state, payload);
    default:
        return state;
    }
};

function setColor(state, payload) {
    return {
        ...state,
        color: payload,
    };
}

export default settingsReducer;