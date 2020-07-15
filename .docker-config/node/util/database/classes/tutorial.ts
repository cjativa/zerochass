import slugify from 'slugify';
import { nanoid } from 'nanoid';

import { Client } from '../client';
import { TutorialInterface } from '../../interfaces/tutorial';

import { Tag } from './tag';
import { TutorialSection } from './tutorialSection';

export class Tutorial {

    tutorial: TutorialInterface;
    userId: number;

    constructor(tutorial: TutorialInterface, userId: number) {
        this.tutorial = tutorial;
        this.userId = userId;
    }

    /** Creates a new tutorial in the database */
    public async createTutorial(): Promise<number> {

        // Insert the main content of the tutorial into the database
        await this.insertTutorial();

        // If we have have sections for the tutorial, let's add them to the database
        if (this.tutorial.sections.length > 0) {
            await TutorialSection.addSections(this.tutorial.id, this.tutorial.sections);
        }

        // If we have tags for the tutorial, let's add them to the database
        // And create the associations between this tutorial and those tags
        if (this.tutorial.tags.length > 0) {

            // Add the tags this tutorial is meant to be related with to the tag table
            await Tag.insertTags(this.tutorial.tags);

            // Get the ids for the tags meant to be associated with this tutorial
            const tagIdentifierList = await Tag.retrieveTagIds(this.tutorial.tags);
            await Tag.createTagAssociations(this.tutorial.id, tagIdentifierList);
        }

        return this.tutorial.id;
    };

    /** Updates an existing tutorial in the database */
    public async updateTutorial() {

        // Update the main content of the tutorial in the database
        await this.upsertTutorial();

        // If we have have sections for the tutorial, let's add them to the database 
        // Any sections not sent back to us that DO exist in the database should be marked for deletion
        if (this.tutorial.sections.length > 0) {
            await TutorialSection.addSections(this.tutorial.id, this.tutorial.sections);
            await TutorialSection.deleteSections(this.tutorial.id, this.tutorial.sections);
        }

        // If we have tags for the tutorial, let's add them to the database
        // And create the associations between this tutorial and those tags
        if (this.tutorial.tags.length > 0) {

            // Add the tags this tutorial is meant to be related with to the tag table
            await Tag.insertTags(this.tutorial.tags);

            // Get the ids for the tags meant to be associated with this tutorial
            const tagIdentifierList = (await Tag.retrieveTagIds(this.tutorial.tags));
            await Tag.createTagAssociations(this.tutorial.id, tagIdentifierList);

            // Delete any tags no longer associated with the tutorial
            const tagList = tagIdentifierList.map((ti) => ti.tag);
            await Tag.deleteTagAssociations(this.tutorial.id, tagList);
        }

        return this.tutorial.id;
    };

    /** Retrieves an existing tutorial in the database */
    public async retrieveTutorial(identifier: number | string, forEditing?: boolean) {

        // Get the id - if the identifier is a number, then this is an id, otherwise it's the slug and we need to retrieve the id first
        const id = (typeof identifier === 'number') ? identifier : await this.getTutorialIdBySlug(identifier);

        const main = (forEditing) ? await this.getTutorialForEditing(id) : await this.getTutorial(id);
        const sections = await TutorialSection.retrieveSectionsForTutorial(id);
        const tags = await Tag.retrieveTagsForTutorial(id);

        const tutorial = {
            ...main,
            sections,
            tags
        };

        return tutorial;
    };

    /** Retrieves all existing tutorials written by the user for editing */
    public async retrieveTutorials() {
        const query = `
        SELECT "title", "description1", "description2", "enabled", "id", "featuredImage", "color", "slug"
        FROM tutorials
        WHERE "userId" = ($1)
        ORDER BY "id" ASC
        `;
        const values = [this.userId];

        const tutorials = (await Client.executeQuery(query, values)).rows;
        return tutorials;
    };

    /** Retrieves tutorials for displaying on site */
    public static async retrieveTutorialsForSite(limit?: boolean) {
        let query = `
        SELECT "title", "description1", "description2", "enabled", "id", "featuredImage", "color", "slug"
        FROM tutorials
        WHERE enabled = true
        `;

        if (limit) query += ` LIMIT 8`;

        const tutorials = (await Client.executeQuery(query)).rows;
        return tutorials;
    };

    /** Retrieves tutorial information for editing */
    private async getTutorialForEditing(id: number) {

        const query = `
        SELECT t."title", t."description1", t."description2", t."enabled", t."color", t."featuredImage", t."id"
        FROM tutorials t
        WHERE t."id" = ($1) AND t."userId" = ($2)
        `;
        const values = [id, this.userId];

        const tutorial = (await Client.executeQuery(query, values)).rows[0];
        return tutorial;
    };

    /** Retrieves tutorial information */
    private async getTutorial(id: number) {

        const query = `
        SELECT 
            t."title", t."description1", t."description2", t."enabled", t."color", t."featuredImage", t."id", t."codeUrl", t."liveUrl",
            u."heading", u."profileImage", u."name"

        FROM tutorials t
        INNER JOIN user_information u 
        ON u."id" = t."userId"
        WHERE t."id" = ($1)
        `;
        const values = [id];

        const tutorial = (await Client.executeQuery(query, values)).rows[0];
        return tutorial;
    };

    /** Retrieves tutorial information */
    public async getTutorialIdBySlug(slug: string): Promise<number> {

        const query = `
        SELECT "id" 
        FROM tutorials
        WHERE tutorials."slug" = ($1)
        `;
        const values = [slug];
        const results = (await Client.executeQuery(query, values));
        const { id } = results.rows[0];

        return id;
    };

    /** Updates a tutorial in the database */
    private async upsertTutorial() {
        const { title, description1, description2, enabled, color, featuredImage, id,
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
    };

    /** Inserts a new tutorial into the database and sets the tutorial id for this instance */
    private async insertTutorial() {

        const { title, description1, description2, enabled, color, featuredImage } = this.tutorial;
        const slug = slugify(title, { lower: true }) + nanoid(4);

        const query = `
        INSERT INTO tutorials 
        ("title", "description1", "description2", "enabled", "color", "featuredImage", "userId", "slug")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
        `;
        const values = [title, description1, description2, enabled, color, featuredImage, this.userId, slug];


        const { id } = (await Client.executeQuery(query, values)).rows[0];
        this.tutorial.id = id;
    };
};