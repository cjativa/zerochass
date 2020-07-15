import { Client } from '../client';
import { TutorialInterface } from '../../interfaces/tutorial';


export class TutorialSection {

    /** Adds or updates the sections for a tutorial */
    public static async addSections(tutorialId: number, tutorialSections: TutorialInterface['sections']) {

        const sectionRequests = tutorialSections.map((section) => {
            let query, values;
            const { title, content, id } = section;

            // If the section has an id, then it needs to be updated
            if (id) {
                query = `
                UPDATE tutorial_sections 
                SET 
                    "title" = ($1),
                    "content" = ($2)
                WHERE "id" = ($3) AND "tutorialId" = ($4)
                `;
                values = [title, content, id, tutorialId];
            }

            // Otherwise, no existing id means it's an insert
            else {
                query = `
                INSERT INTO tutorial_sections ("title", "content", "tutorialId")
                VALUES ($1, $2, $3)
                `;
                values = [title, content, tutorialId];
            }

            return Client.executeQuery(query, values);
        });

        await Promise.all(sectionRequests);
    };

    /** Deletes any sections that from the tutorial that exist in the database but were not sent along with an update */
    public static async deleteSections(tutorialId: number, providedSections: TutorialInterface['sections']) {

        // Iterate through the sections we've been provided by the request
        const sectionsToDelete = providedSections.filter((providedSection) => providedSection.isDeleted);

        if (sectionsToDelete.length > 0) {
            const idsToDelete = sectionsToDelete.map((sd) => sd.id).join();

            const query = `
            DELETE FROM tutorial_sections 
            WHERE "id" IN (${idsToDelete})
            AND "tutorialId" = ${tutorialId}
            `;

            await Client.executeQuery(query);
        }
    };

    /** Retrieve the sections for the tutorial */
    public static async retrieveSectionsForTutorial(tutorialId: number): Promise<TutorialInterface['sections']> {

        const query = `
        SELECT id, title, content
        FROM tutorial_sections 
        WHERE "tutorialId" = ($1)
        ORDER BY "id" ASC   
        `;
        const values = [tutorialId];

        const sections = (await Client.executeQuery(query, values)).rows;
        return sections;
    };

    /** Retrieves the id of the tutorial that the section belongs to */
    public static async retrieveAssociatedTutorial(sectionId: number): Promise<number> {

        const query = `
            SELECT "tutorialId"
            FROM tutorial_sections
            WHERE "id" = ($1)
        `;
        const values = [sectionId];

        const { tutorialId } = (await Client
            .executeQuery(query, values))
            .rows.shift();

        return tutorialId;
    }

    /** Retrieves all of the section id's for a specified tutorial id */
    public static async retrieveSectionIds(tutorialId: number): Promise<number[]> {

        const query = `
            SELECT "id"
            FROM tutorial_sections
            WHERE "tutorialId" = ($1)
        `;
        const values = [tutorialId];

        const sectionIds = (await Client.executeQuery(query, values)).rows.map((row) => row.id);
        return sectionIds;
    }
}