import { Action } from '../../interfaces/action';
import { Store } from '../store';
import * as at from '../actionTypes/authenticationActionTypes';

import { LoginResponse, AuthenticationResponse } from '../../interfaces/authentication/authInterfaces';
import { AuthenticationService } from '../../services/authenticationService';

const as = new AuthenticationService();

const dispatch = Store.dispatch;

/* export class FetchSignUp implements Action {

    public type: string = at.SIGN_UP;

    constructor(public payload: { response: string }) {}
} */

class UserLoginSuccess implements Action {

    public type: string = at.USER_LOGIN_SUCCESS;

    constructor(public payload: { accessToken: string, email: string, name: string, success: boolean, message: string, username: string }) { }
}

class UserLoginFailure implements Action {

    public type: string = at.USER_LOGIN_FAILURE;

    constructor(public payload: { success: boolean, message: string }) { }
}

class UserLogout implements Action {

    public type: string = at.USER_LOGOUT;

    constructor(public payload: {}) { }
}

export const logIn = async (username: string, password: string): Promise<boolean> => {

    const response = await as.login(username, password) as LoginResponse;
    const { success, message } = response;

    if (success) {
        const { tokens, userPayload } = response;

        const { accessToken } = tokens;
        const { email, name } = userPayload;

        dispatch(Object.assign({}, new UserLoginSuccess({ accessToken, email, name, success, message, username })));
    }

    else {
        dispatch(Object.assign({}, new UserLoginFailure({ success, message })));
    }

    return success;
}

export const signUp = async (username: string, email: string, password: string): Promise<AuthenticationResponse> => {

    const response = await as.signUp(username, email, password) as AuthenticationResponse;

    return response;
}

export const logOut = () => {
    dispatch(Object.assign({}, new UserLogout({})));
}