import * as at from 'store/actionTypes/tutorialActionTypes';

import { Action } from 'interfaces/action';
import { Tutorial } from 'interfaces/tutorial';

export interface TutorialStateInterface {
    tutorials: any,
    tutorial: any
}

const initialState: TutorialStateInterface = {
    tutorials: null,
    tutorial: null
}

export function TutorialState(state: TutorialStateInterface = initialState, action: Action) {

    switch (action.type) {

        case at.FETCH_TUTORIALS: {

            const { tutorials } = action.payload;

            return { ...state, tutorials };
        }

        case at.FETCH_TUTORIAL: {

            const { tutorial } = action.payload;

            return { ...state, tutorial };
        }

        default:
            return state;
    }
   
}
