import { Client } from '../database/client';
import { WriteTutorial } from '../../util/interfaces/writeTutorial';

class TutorialService {

    /** Creates a new tutorial in the database */
    public static createTutorial = async (tutorial: WriteTutorial, userId: number) => {

        const { title, description1, description2, enabled, color, featuredImage } = tutorial;
        const { tags, sections } = tutorial;

        const insertQuery = `
        INSERT INTO tutorials ("title", "description1", "description2", "enabled", "color", "featuredImage", "userId")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
        `;
        const values = [title, description1, description2, enabled, color, featuredImage, userId];

        const { rows } = await Client.executeQuery(insertQuery, values);
        const { id: tutorialId } = rows[0];

        await TutorialService.addSections(sections, tutorialId);

        return tutorialId as number;
    };

    /** Updates an existing tutorial in the database */
    public static updateTutorial = async (tutorial: WriteTutorial, userId: number) => {

        const { title, description1, description2, enabled, color, featuredImage, id: tutorialId } = tutorial;
        const { tags, sections } = tutorial;

        const query = `
        UPDATE tutorials
        SET 
        "title" = ($1),
        "description1" = ($2), 
        "description2" = ($3), 
        "enabled" = ($4),
        "color" = ($5),
        "featuredImage" = ($6) 
        WHERE ("id" = ($7) AND "userId" = ($8))
        `;
        const values = [title, description1, description2, enabled, color, featuredImage, tutorialId, userId];

        await Client.executeQuery(query, values);
        await TutorialService.addSections(sections, tutorialId);
    };

    /** Adds the sections for a tutorial */
    public static addSections = async (sections: WriteTutorial['sections'], tutorialId: number) => {

        const sectionRequests = [];

        for (let i = 0; i < sections.length; i++) {

            const { title, content, id } = sections[i];
            
            let query;
            let values;

            // If we have an id available, then this is an update
            if (id) {

                query = `
                UPDATE tutorial_sections 
                    SET 
                        "title" = ($1),
                        "content" = ($2)
                WHERE "id" = ($3) AND "tutorialId" = ($4)
                `;
                values = [title, content, id, tutorialId];
                console.log(values);
            }

            // Otherwise, it's an insert
            else {
                query = `
                INSERT INTO tutorial_sections ("title", "content", "tutorialId")
                VALUES ($1, $2, $3)
                `;
                values = [title, content, tutorialId];
            }

            sectionRequests.push(Client.executeQuery(query, values));
        }

        await Promise.all(sectionRequests);
    };

    /** Retrieves an existing tutorial in the database */
    public static retrieveTutorial = async (tutorialId: number, userId: number) => {

        const query = `
        SELECT t."title", t."description1", t."description2", t."enabled", t."color", t."featuredImage", t."id"
        FROM tutorials t
        WHERE t."id" = ($1) AND t."userId" = ($2)
        `;
        const values = [tutorialId, userId];

        const { rows } = await Client.executeQuery(query, values);
        const tutorial = rows[0];

        return tutorial;
    };

    /** Retrieve the sections for the tutorial */
    public static retrieveSectionsForTutorial = async (tutorialId: number) => {

        const query = `
        SELECT id, title, content
        FROM tutorial_sections 
        WHERE "tutorialId" = ($1)
        `;
        const values = [tutorialId];

        const { rows } = await Client.executeQuery(query, values);
        const sections = rows;

        return sections;
    };

    /** Retrieves all existing tutorials written by the user for editing */
    public static retrieveTutorials = async (userId: number) => {

        const query = `
        SELECT "title", "description1", "description2", "enabled", "id", "featuredImage"
        FROM tutorials
        WHERE "userId" = ($1)
        `;
        const values = [userId];

        const { rows } = await Client.executeQuery(query, values);
        return rows;
    };
}

export default TutorialService;