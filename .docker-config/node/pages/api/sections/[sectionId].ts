import { TutorialProgressManager } from '../../../util/database/classes/tutorialProgressManager';
import protectWithAuthentication from '../../../util/middleware/protectWithAuthentcation';


const handler = async (request, response) => {

    const { method } = request;

    try {
        if (method === 'POST') await updateSectionProgress(request, response);

    }

    catch (error) {
        console.log(`An error occurred performing a ${method} request on /section`, error);
    }
};

/** Handles updating the progress of the section */
const updateSectionProgress = async (request, response) => {

    // Get the section id and whether the section should be complete for this user
    let {
        query: { sectionId },
        body: { complete },
        userId
    } = request;
    let sectionProgress;

    sectionId = parseInt(sectionId);

    // If the section should be completed, mark it as complete
    if (complete == true)  sectionProgress = await TutorialProgressManager.setSectionComplete(userId, sectionId);

    // If the section should not be completed, mark it as not complete
    if (complete == false) sectionProgress = await TutorialProgressManager.setSectionIncomplete(sectionId, userId);

    response.json(sectionProgress);
};

export default protectWithAuthentication(handler);