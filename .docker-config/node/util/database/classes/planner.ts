import { Client } from '../client';
import { TutorialSectionService } from './tutorialSectionDatabaseService';
import { TutorialProgressManager } from './tutorialProgressManager';

export class Planner {

    /** Get the id of the planner belonging to the user */
    public static async getPlannerId(userId: number): Promise<number> {

        const query = `
            SELECT "id"
            FROM planner 
            WHERE "userId" = $1
        `;
        const values = [userId];

        const { id } = (await Client.executeQuery(query, values)).rows.shift();
        return id;
    }

    /** Register this tutorial into the user's planner and initializes the sections for progress tracking */
    public static async registerTutorial(tutorialId: number, plannerId: number, userId: number): Promise<void> {

        // Add this tutorial to the planner
        await this.insertTutorial(tutorialId, plannerId);

        // Register all of its sections into the tutorial section progress table
        const sectionIds = await TutorialSectionService.retrieveSectionIds(tutorialId);
        const registrations = sectionIds.map((sectionId) => TutorialProgressManager.registerSection(sectionId, userId));

        await Promise.all(registrations);
    }

    /** Checks if the provided tutorial is registered in the user's planner */
    public static async isTutorialRegistered(tutorialId: number, plannerId: number): Promise<boolean> {

        const query = `
            SELECT EXISTS (
            SELECT 1
            FROM planner_detail 
            WHERE "tutorialId" = $1 AND "plannerId" = $2
        )
        `;
        const values = [tutorialId, plannerId];

        const result = await Client.executeQuery(query, values);
        return result;
    }

    /** Inserts a tutorial id into the planner detail */
    private static async insertTutorial(tutorialId: number, plannerId: number) {

        const query = `
            INSERT INTO planner_detail 
            ("plannerId", "tutorialId")
            VALUES ($1, $2)
        `;
        const values = [plannerId, tutorialId];

        await Client.executeQuery(query, values);
    }
}