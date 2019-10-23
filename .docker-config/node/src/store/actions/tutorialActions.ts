import { Action } from 'interfaces/action';
import * as at from 'store/actionTypes/tutorialActionTypes';

import { Tutorial } from 'interfaces/tutorial';

export class FetchTutorialsData implements Action {

    public type: string = at.FETCH_TUTORIALS;

    constructor(public payload: { tutorials: Tutorial[] }) { }
}

export class FetchTutorialData implements Action {

    public type: string = at.FETCH_TUTORIAL;

    constructor(public payload: { tutorial: Tutorial }) { }
}


export const FetchTutorial = (id: string) => async (dispatch) => {

        let response = await fetch(`/api/tutorial/${id}`);

        let tutorial = await response.json() as Tutorial;

        return dispatch(Object.assign({}, new FetchTutorialData({tutorial})));
}

export const FetchTutorials = () => async (dispatch) => {

    let response = await fetch('/api/tutorials');

    let tutorials = await response.json() as Tutorial[];

    return dispatch(Object.assign({}, new FetchTutorialsData({tutorials})));
}