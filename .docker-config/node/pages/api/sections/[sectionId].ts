import { TutorialProgressManager } from '../../../util/database/classes/tutorialProgressManager';
const handler = async (request, response) => {

    const { method } = request;

    try {
        if (method === 'PUT') await updateSectionProgress(request, response);

    }

    catch {
        console.log(`An error occurred performing a ${method} request on /section`);
    }


};

const updateSectionProgress = async (request, response) => {

    const {
        query: { sectionId },
        body: { complete },
        userId
    } = request;

    if (complete == true) await TutorialProgressManager.setSectionComplete(userId, sectionId);


    if (complete == false) await TutorialProgressManager.setSectionIncomplete(sectionId);

    response.json(`Completed`);
};

export default handler;