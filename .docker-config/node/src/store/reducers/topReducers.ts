import { combineReducers } from 'redux';

import { TutorialState, TutorialStateInterface } from '../../store/reducers/tutorialsReducer';
import { UserState, UserStateInterface } from '../../store/reducers/authenticationReducer';
import { Action } from '../../interfaces/action';

export const appReducer = combineReducers({
    TutorialState,
    UserState
});

export const rootReducer = (state: any, action: Action) => {

    if (action.type === 'USER_LOGOUT') {
        state.UserState = undefined;
    }

    return appReducer(state, action);
}

export interface ZerochassStoreInterface {
    TutorialState: TutorialStateInterface,
    UserState: UserStateInterface
}