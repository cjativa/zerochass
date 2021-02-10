import express from 'express';
import Planner from '../database/classes/planner/planner';
import TutorialSection from '../database/classes/tutorialSection';
import TutorialProgressManager from '../database/classes/tutorialProgressManager';

/** Controller for Planner requests */
const PlannerController = {

    /** Retrieves the enrollment status for the tutorial for the signed in user */
    retrieveEnrollmentForTutorial: async function (request: express.Request & any, response: express.Response) {

        // Get the section id and whether the section should be complete for this user
        const {
            query: { tutorialId: id },
            userId
        } = request;
        const tutorialId = parseInt(id as string);

        // Retrieve the planner id for this user
        const plannerId = await Planner.getPlannerId(userId);

        // Find out if this tutorial is register in the planner
        const isTutorialRegistered = await Planner.isTutorialRegistered(tutorialId, plannerId);
        let sectionProgress = [];

        if (isTutorialRegistered) {

            // Retrieve the list of section ids and find the progress
            const sectionIds = await TutorialSection.retrieveSectionIds(tutorialId);
            sectionProgress = await TutorialProgressManager.retrieveSectionProgress(sectionIds, userId);
        }

        response.json({ isTutorialRegistered, sectionProgress });
    },

    /** Handles registration of the provided tutorial into the planner of the signed in user */
    handleTutorialEnrollment: async function (request, response) {

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

        // Return the final status of the tutorial being registered
        const isTutorialRegistered = await Planner.isTutorialRegistered(tutorialId, plannerId);

        response.json({ isTutorialRegistered });
    }
};

export default PlannerController;