import * as ACTION_TYPES from '../actions/action_types.js';

export const initialState = {
    user_textChange: '',
    user_textSubmit: ''
}

export const FormReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.USER_INPUT_CHANGE:
            return {
                ...state,
                user_textChange: action.payload
            }
        case ACTION_TYPES.USER_INPUT_SUBMIT:
            return {
                ...state,
                user_textSubmit: action.payload
            }
        default:
            throw new Error();
    }
}