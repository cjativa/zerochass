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

        console.log(query, values);

        await Client.executeQuery(query, values);
        await TutorialService.addSections(sections, tutorialId);
    };

    /** Adds the sections for a tutorial */
    public static addSections = async (sections: WriteTutorial['sections'], tutorialId: number) => {

        const sectionRequests = [];

        for (let i = 0; i < sections.length; i++) {

            const { title, content } = sections[i];

            const insertQuery = `
            INSERT INTO tutorial_sections ("title", "content", "tutorialId")
            VALUES ($1, $2, $3)
            ON CONFLICT
            DO UPDATE
            SET
            "title" = EXCLUDED."title",
            "content" = EXCLUDED."content"
            `;
            const values = [title, content, tutorialId];
            sectionRequests.push(Client.executeQuery(insertQuery, values));
        }

        await Promise.all(sectionRequests);
    };

    /** Retrieves an existing tutorial in the database */
    public static retrieveTutorial = async (tutorialId: number, userId: number) => {

        const query = `
        SELECT "title", "description1", "description2", "enabled", "color", "featuredImage", "id" 
        FROM tutorials 
        WHERE "id" = ($1) AND "userId" = ($2)
        `;
        const values = [tutorialId, userId];

        const { rows } = await Client.executeQuery(query, values);
        const tutorial = rows[0];

        return tutorial;
    };
}

export default TutorialService;