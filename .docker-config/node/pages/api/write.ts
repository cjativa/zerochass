
import protectWithAuthentication from '../../util/middleware/protectWithAuthentcation';
import TutorialService from '../../util/services/tutorialHelpers';

import { S3 } from '../../util/aws';

import { Tutorial, TutorialRequest } from '../../util/interfaces/tutorial';
import { TutorialDatabaseService } from '../../util/database/classes/tutorialDatabaseService';

const handler = async (request, response) => {

    const { method } = request;

    if (method === 'GET') await retrieveTutorial(request, response);
    if (method === 'POST') await createTutorial(request, response);
    if (method === 'PUT') await updateTutorial(request, response);

};

const retrieveTutorial = async (request, response) => {

    // Get the tutorial
    const { id } = request.params.slug;
    const { userId } = request;

    const tds = new TutorialDatabaseService(null, userId);
    const tutorial = await tds.retrieveTutorial(id);

    response.json(tutorial);
};

const createTutorial = async (request, response) => {

    // Get the tutorial to write and the user id for it
    const tutorialRequest = request.body as TutorialRequest;
    const { userId } = request;

    const preparedTutorial = await TutorialService.prepareTutorial(tutorialRequest);

    const tds = new TutorialDatabaseService(preparedTutorial, userId);
    const id = await tds.createTutorial();

    response.json(id);
};

const updateTutorial = async (request, response) => {

    // Get the tutorial to write
    const tutorialRequest = request.body as TutorialRequest;
    const { userId } = request;

    const preparedTutorial = await TutorialService.prepareTutorial(tutorialRequest);

    const tds = new TutorialDatabaseService(preparedTutorial, userId);
    const id = await tds.createTutorial();

    response.json(id);
};

export default protectWithAuthentication(handler);