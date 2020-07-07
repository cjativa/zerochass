import { Client, } from '../client';
import QueryHelpers from '../queryHelpers';
import Planner from './planner';
import { TutorialSectionService } from './tutorialSectionDatabaseService';

export class TutorialProgressManager {

    /** Registers the section this tutorial belongs to the user's Planner 
     * and marks this particular section as complete
     */
    public static async setSectionComplete(userId: number, sectionId: number): Promise<void> {

        // Get the tutorial id this section belongs to
        const tutorialId = await TutorialSectionService.retrieveAssociatedTutorial(sectionId);

        // Check if the tutorial the section belongs to is in the users planner
        const plannerId = await Planner.getPlannerId(userId);
        const isTutorialRegistered = await Planner.isTutorialRegistered(tutorialId, plannerId);

        // If the tutorial is not registered, register it and its sections
        if (isTutorialRegistered === false) await Planner.registerTutorial(tutorialId, plannerId, userId);

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

    /** Marks this particular section as incomplete */
    public static async setSectionIncomplete(sectionId: number): Promise<void> {

        // Mark the section as complete
        const query = `
            UPDATE tutorial_sections_progress
            SET 
            "isCompleted" = false
            WHERE "sectionId" = ($1)
        `;
        const values = [sectionId];

        await Client.executeQuery(query, values);
    }

    /** Registers section for progress tracking */
    public static async registerSection(sectionId: number, userId: number): Promise<void> {

        const query = `
            INSERT INTO tutorial_sections_progress
            ("sectionId", "userId")
            VALUES ($1, $2)
        `;
        const values = [sectionId, userId];

        await Client.executeQuery(query, values);
    }

    /** Unregisters section from progress tracking */
    public static async unregisterSection(sectionId: number, userId: number): Promise<void> {

        const query = `
        DELETE FROM tutorial_sections_progress
        WHERE "sectionId" = ($1) AND "userId" = ($2)  
        `;
        const values = [sectionId, userId];

        await Client.executeQuery(query, values);
    }

    /** Retrieves the progress of this section */
    public static async retrieveSectionProgress(sectionIds: number[], userId: number): Promise<{ sectionId: number, userId: number, isComplete: boolean }[]> {

        const placeholder = QueryHelpers.expand(1, sectionIds.length);

        const query = `
        SELECT "sectionId", "userId", "isComplete"
        FROM tutorial_sections_progress
        WHERE "sectionId" IN ${placeholder} AND "userId" = ($${sectionIds.length + 1})  
        `;
        const values = [...sectionIds, userId];

        const response = await Client.executeQuery(query, values);
        return response.rows;
    }
}