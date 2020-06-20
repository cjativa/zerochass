import { Client } from '../client';
import { Planner } from './planner';
import { TutorialSectionService } from './tutorialSectionDatabaseService';

export class TutorialProgressManager {

    /** Registers the section this tutorial belongs to the user's Planner 
     * and marks this particular section as complete
     */
    public static async setSectionComplete(userId: number, sectionId: number) {

        // Get the tutorial id this section belongs to
        const tutorialId = await TutorialSectionService.retrieveAssociatedTutorial(sectionId);

        // Check if the tutorial the section belongs to is in the users planner
        const plannerId = await Planner.getPlannerId(userId);
        const isTutorialRegistered = await Planner.isTutorialRegistered(tutorialId, plannerId);

        // If the tutorial is not registered, register it and add its sections
        if (isTutorialRegistered === false) {
            await Planner.registerTutorial(tutorialId, plannerId, userId);
        }

        // Mark the section as complete
        const query = `
            UPDATE tutorial_sections_progress
            SET 
            "isCompleted" = true
            WHERE "sectionId" = ($1)
        `;
        const values = [sectionId];

        await Client.executeQuery(query, values);
    }

    /** Registers section progress for initialization */
    public static async registerSection(sectionId: number, userId: number) {

        const query = `
            INSERT INTO tutorial_sections_progress
            ("sectionId", "userId")
            VALUES ($1, $2)
        `;
        const values = [sectionId, userId];

        await Client.executeQuery(query, values);
    }
}