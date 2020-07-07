import protectWithAuthentication from '../../../util/middleware/protectWithAuthentcation';
import Planner from '../../../util/database/classes/planner';
import { TutorialSectionService } from '../../../util/database/classes/tutorialSectionDatabaseService';
import { TutorialProgressManager } from '../../../util/database/classes/tutorialProgressManager';

const handler = async (request, response) => {

    const { method } = request;

    if (method === 'GET') await retrieveTutorialEnrollment(request, response);
    if (method === 'POST') await handleTutorialEnrollment(request, response);
};

/** Retrieves the enrollment status for the tutorial for the signed in user */
const retrieveTutorialEnrollment = async (request, response) => {

    // Get the section id and whether the section should be complete for this user
    const {
        query: { tutorialId },
        userId
    } = request;

    // Retrieve the planner id for this user
    const plannerId = await Planner.getPlannerId(userId);

    // Find out if this tutorial is register in the planner
    const isTutorialRegistered = await Planner.isTutorialRegistered(tutorialId, plannerId);
    let sectionProgress = [];

    if (isTutorialRegistered) {

        // Retrieve the list of section ids and find the progress
        const sectionIds = await TutorialSectionService.retrieveSectionIds(tutorialId);
        sectionProgress = await TutorialProgressManager.retrieveSectionProgress(sectionIds, userId);
    }

    response.json({ isTutorialRegistered, sectionProgress });
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
        if (isAlreadyEnrolled == true) {
            await Planner.unregisterTutorial(tutorialId, plannerId, userId);
        }
    }

    response.json(`Completed`);
};


export default protectWithAuthentication(handler);