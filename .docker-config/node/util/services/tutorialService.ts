import { Client } from '../database/client';
import { WriteTutorial } from '../../util/interfaces/writeTutorial';

class TutorialService {

    /** Creates a new tutorial in the database */
    public createTutorial = async (tutorial: WriteTutorial, userId: number) => {

        const { title, description1, description2, enabled, color, featuredImage } = tutorial;

        const insertTutorialQuery = `
        INSERT INTO tutorials ("title", "description1", "description2", "enabled", "color", "featuredImage", "userId")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
        `;
        const tutorialValues = [title, description1, description2, enabled, color, featuredImage, userId];

        const { rows } = await Client.executeQuery(insertTutorialQuery, tutorialValues);
        const { id } = rows[0];

        return id as number;
    };

    /** Updates an existing tutorial in the database */
}

export default TutorialService;