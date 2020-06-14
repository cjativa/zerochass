
import protectWithAuthentication from '../../util/middleware/protectWithAuthentcation';
import TutorialService from '../../util/services/tutorialHelpers';
import { Tutorial, TutorialRequest } from '../../util/interfaces/tutorial';

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

    const tutorial = await TutorialService.retrieveTutorial(id, userId);
    response.json(tutorial);
};

const createTutorial = async (request, response) => {

    // Get the tutorial to write
    const tutorialRequest = request.body as TutorialRequest;
    const { userId } = request;

    const id = await TutorialService.createTutorial(tutorialRequest, userId);
    response.json(id);
};

const updateTutorial = async (request, response) => {

    // Get the tutorial to write
    const tutorial = request.body as TutorialRequest;
    const { userId } = request;

    await TutorialService.updateTutorial(tutorial, userId);
    response.json('Updated');
};

export default protectWithAuthentication(handler);