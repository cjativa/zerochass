import protectWithAuthentication from '../../util/middleware/protectWithAuthentcation';
import { UserService } from '../../util/services/userService';
import TutorialService from '../../util/services/tutorialService';
import { WriteTutorial } from '../../util/interfaces/writeTutorial';


const handler = async (request, response) => {
    const { userId } = request;

    if (request.method === 'GET') {

    }

    if (request.method === 'POST') {

        // Get the tutorial to write
        const tutorial = request.body as WriteTutorial;

        // If we have an id, it means it's an update
        if (tutorial.id) {
            await TutorialService.updateTutorial(tutorial, userId);
            response.json('Updated');
        }

        // Otherwise, it's a new tutorial
        else {
            const tutorialId = await TutorialService.createTutorial(tutorial, userId);
            response.json(tutorialId);
        }
    }


    response.json('Write');
};

export default protectWithAuthentication(handler);