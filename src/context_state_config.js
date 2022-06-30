import React, { useReducer } from 'react';
import Context from './utils/context.js';
import * as ACTIONS from './store/actions/actions.js';

import * as Reducer1 from './store/reducers/plain_reducer.js';
import * as AuthReducer from './store/reducers/auth_reducer.js';
import * as FormReducer from './store/reducers/form_reducer.js';
import Routes from './routes.js';

import Auth from './utils/auth.js';

const auth = new Auth();

const ContextState = () => {
    const [stateReducer1, dispatchReducer1] = useReducer(Reducer1.Reducer1, Reducer1.initialState);
    const [stateAuthReducer, dispatchAuthReducer] = useReducer(AuthReducer.AuthReducer, AuthReducer.initialState);
    const [stateFormReducer, dispatchFormReducer] = useReducer(FormReducer.FormReducer, FormReducer.initialState);

    const handleDispatchTrue = () => {
        dispatchReducer1(ACTIONS.success());
    }

    const handleDispatchFalse = () => {
        dispatchReducer1(ACTIONS.failure());
    }

    const handleLogin = () => {
        dispatchAuthReducer(ACTIONS.login_success());
    }

    const handleLogout = () => {
        dispatchAuthReducer(ACTIONS.login_failure());
    }

    const handleAddProfile = (profile) => {
        dispatchAuthReducer(ACTIONS.add_profile(profile));
    }

    const handleRemoveProfile = () => {
        dispatchAuthReducer(ACTIONS.remove_profile());
    }

    const handleFormChange = (event) => {
        dispatchFormReducer(ACTIONS.user_input_change(event.target.value));
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        event.persist();
        dispatchFormReducer(ACTIONS.user_input_submit(event.target.value));
    }

    const handleAuthentication = (props) => {
        if (props.location.hash) {
            auth.handleAuth();
        }
    }

    return (
        <div>
            <Context.Provider
                value={{
                    stateProp1: stateReducer1.stateprop1,
                    stateProp2: stateReducer1.stateprop2,
                    dispatchContextTrue: () => handleDispatchTrue(),
                    dispatchContextFalse: () => handleDispatchFalse(),

                    useContextChangeState: stateFormReducer.user_textChange,
                    useContextSubmitState: stateFormReducer.user_textSubmit,
                    useContextChange: (event) => handleFormChange(event.target.value),
                    useContextSubmit: (event) => handleFormSubmit(event.target.value),

                    authState: stateAuthReducer.is_authenticated,
                    profileState: stateAuthReducer.profile,
                    handleUserLogin: () => handleLogin(),
                    handleUserLogout: () => handleLogout(),
                    handleUserAddProfile: (profile) => handleAddProfile(profile),
                    handleUserRemoveProfile: () => handleRemoveProfile(),

                    handleAuth: (props) => handleAuthentication(props),
                    authObj: auth
                }}>
                <Routes />
            </Context.Provider>
        </div>
    );
}

export default ContextState;