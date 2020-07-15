
import protectWithAuthentication from '../../util/middleware/protectWithAuthentcation';
import TutorialService from '../../util/services/tutorialHelpers';

import { TutorialRequest } from '../../util/interfaces/tutorial';
import { Tutorial } from '../../util/database/classes/tutorial';

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

    const tds = new Tutorial(null, userId);
    const tutorial = await tds.retrieveTutorial(id, true);

    response.json(tutorial);
};

const createTutorial = async (request, response) => {

    // Get the tutorial to write and the user id for it
    const tutorialRequest = request.body as TutorialRequest;
    const { userId } = request;

    const preparedTutorial = await TutorialService.prepareTutorial(tutorialRequest);

    const tds = new Tutorial(preparedTutorial, userId);
    const id = await tds.createTutorial();

    response.json(id);
};

const updateTutorial = async (request, response) => {

    // Get the tutorial to write
    const tutorialRequest = request.body as TutorialRequest;
    const { userId } = request;

    const preparedTutorial = await TutorialService.prepareTutorial(tutorialRequest);

    const tds = new Tutorial(preparedTutorial, userId);
    const id = await tds.updateTutorial();

    response.json(id);
};

export default protectWithAuthentication(handler);