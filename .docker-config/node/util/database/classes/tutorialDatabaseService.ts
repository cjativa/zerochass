import { Client } from '../client';
import { Tutorial } from '../../interfaces/tutorial';

export class TutorialDatabaseService {

    tutorial: Tutorial;
    userId: number;

    constructor(tutorial: Tutorial, userId: number) {
        this.tutorial = tutorial;
        this.userId = userId;
    }

    /** Creates a new tutorial in the database */
    public async createTutorial() {

        const { title, description1, description2, enabled, color, featuredImage } = this.tutorial;
        const values = [title, description1, description2, enabled, color, featuredImage, this.userId];

        const query = `
        INSERT INTO tutorials 
        ("title", "description1", "description2", "enabled", "color", "featuredImage", "userId")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
        `;

        const { id } = (await Client.executeQuery(query, values)).rows[0];
        this.tutorial.id = id;

        return id;
    };

    /** Adds or updates the sections for a tutorial */
    public async addSections() {

        const sectionRequests = this.tutorial.sections.map((section) => {
            let query, values;
            const { title, content, id } = section;

            // If we have an id available, then this is an update
            if (id) {
                query = `
                UPDATE tutorial_sections 
                SET 
                    "title" = ($1),
                    "content" = ($2)
                WHERE "id" = ($3) AND "tutorialId" = ($4)
                `;
                values = [title, content, id, this.tutorial.id];
            }

            // Otherwise, it's an insert
            else {
                query = `
                INSERT INTO tutorial_sections ("title", "content", "tutorialId")
                VALUES ($1, $2, $3)
                `;
                values = [title, content, this.tutorial.id];
            }

            return Client.executeQuery(query, values);
        });

        await Promise.all(sectionRequests);
    };

    /** Associates a tutorial with a list of tags */
    public async associateTutorialAndTags(tagIds: number[]) {

        const valueString = tagIds.map((tag, index) => {
            const counter = index + 1;
            const first = counter + index;
            const second = first + 1;
            return `($${first}, $${second})`
        }
        ).join();
        const values = tagIds.reduce((acc, tagId) => {
            acc.push(tagId, this.tutorial.id);
            return acc;
        }, []);

        const query = `
        INSERT INTO tutorial_tag_relations ("tagId", "tutorialId")
        VALUES ${valueString}
        ON CONFLICT
        DO NOTHING
        `;

        console.log(query, values);

        await Client.executeQuery(query, values);
    };

    /** Retrieves an existing tutorial in the database */
    public async retrieveTutorial(id: number) {

        const query = `
        SELECT t."title", t."description1", t."description2", t."enabled", t."color", t."featuredImage", t."id"
        FROM tutorials t
        WHERE t."id" = ($1) AND t."userId" = ($2)
        `;
        const values = [id, this.userId];

        const tutorial = (await Client.executeQuery(query, values)).rows[0];
        return tutorial;
    };

    /** Retrieve the sections for the tutorial */
    public async retrieveSectionsForTutorial(tutorialId: number) {

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

    /** Retrieves all existing tutorials written by the user for editing */
    public async retrieveTutorials() {
        const query = `
        SELECT "title", "description1", "description2", "enabled", "id", "featuredImage", "color"
        FROM tutorials
        WHERE "userId" = ($1)
        `;
        const values = [this.userId];

        const tutorials = (await Client.executeQuery(query, values)).rows;
        return tutorials;
    };

    /** Updates an existing tutorial in the database */
    public async updateTutorial(): Promise<number> {

        const {
            title, description1, description2, enabled, color, featuredImage, id,
            tags, sections
        } = this.tutorial;

        const query = `
        UPDATE tutorials
        SET 
            "title" = ($1),
            "description1" = ($2), 
            "description2" = ($3), 
            "enabled" = ($4),
            "color" = ($5),
            "featuredImage" = ($6) 
        WHERE "id" = ($7) AND "userId" = ($8)
        RETURNING "id"
        `;
        const values = [title, description1, description2, enabled, color, featuredImage, id, this.userId];

        await Client.executeQuery(query, values);
        return id;
    };
};