import express from 'express';
import Tutorial from '../database/classes/tutorial/tutorial';

/** Controller for Tutorial requests */
const TutorialController = {

    /** Retrieves information for a tutorial */
    getTutorial: async function (request: express.Request, response: express.Response) {

        const { slug } = request.params;
        const tutorial = await Tutorial.retrieveTutorial(slug);
        response.json(tutorial);
    },
};

export default TutorialController;