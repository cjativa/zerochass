import { Action } from "../../interfaces/action";
import * as at from '../../store/actionTypes/authenticationActionTypes';

export interface UserStateInterface {
    
    authentication: {
        signedIn: boolean,
        message: string,
        accessToken: string,
    },

    account: {
        username: string,
        email: string
    },

    profile: {
        name: string
    }
}

const initialState: UserStateInterface = {

    authentication: {
        signedIn: null,
        message: null,
        accessToken: null, 
    },

    account: {
        username: null,
        email: null,
    },

    profile: {
        name: null
    }
}

export function UserState(state: UserStateInterface = initialState, action: Action) {

    switch (action.type) {
        
        case at.USER_LOGIN_SUCCESS: {

            console.log('Logging user in');

            const { accessToken, email, name, success, message, username } = action.payload;

            const authentication = { signedIn: success, message, accessToken };
            const account = { username, email };
            const profile = { name };

            return { ...state, authentication, account, profile };
        }

        case at.USER_LOGIN_FAILURE: {

            const { success, message } = action.payload;

            return { ...state.authentication, success, message };
        }

        case at.USER_LOGOUT: {
            return { ...initialState };
        }

        default: {
            return state;
        }
    }
}