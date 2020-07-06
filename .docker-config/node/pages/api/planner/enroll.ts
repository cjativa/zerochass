import protectWithAuthentication from '../../../util/middleware/protectWithAuthentcation';
import Planner from '../../../util/database/classes/planner';

const handler = async (request, response) => {

    const { method } = request;

    if (method === 'POST') await handleTutorialEnrollment(request, response);
};

/** Handles registration of the provided tutorial into the planner of the signed in user */
const handleTutorialEnrollment = async (request, response) => {

    // Get the section id and whether the section should be complete for this user
    const {
        body: { tutorialId, shouldBeEnrolled },
        userId
    } = request;

    // Get the planner id for the user, check if they're already enrolled
    const plannerId = await Planner.getPlannerId(userId);
    const isAlreadyEnrolled = await Planner.isTutorialRegistered(tutorialId, plannerId);

    // If the user should be enrolled
    if (shouldBeEnrolled == true) {

        // If they're not already enrolled, enroll them
        if (isAlreadyEnrolled == false) {
            await Planner.registerTutorial(tutorialId, plannerId, userId);
        }
    }

    // Otherwise, the user should be unenrolled
    else {

        // If they're already enrolled, unenroll them
        if (isAlreadyEnrolled == false) {
            await Planner.unregisterTutorial(tutorialId, plannerId, userId);
        }
    }

    response.json(`Completed`);
};


export default protectWithAuthentication(handler);