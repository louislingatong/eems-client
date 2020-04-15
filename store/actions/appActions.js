/**============================
 * Actions for the settings
 * ============================
 *
 * The actions that are available on the
 * settings
 */

import {
    CHANGE_COLOR,
} from '../action-types/appActionTypes';

export function changeColor(payload) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_COLOR,
            payload: payload,
        });
    };
}