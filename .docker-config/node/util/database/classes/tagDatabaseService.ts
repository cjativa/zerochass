import { Client } from '../client';

export class TagDatabaseService {

    /** Find tags given a search term */
    public static findMatchingTag = async (term: string) => {

        const query = `
        SELECT 
        "id",
        "tag"
        FROM tags
        WHERE "tag" LIKE '%${term}%'
        `;

        const { rows } = await Client.executeQuery(query);
        return rows;
    };

    /** Adds a tag to the database via insert - does nothing if the tag already exists */
    public static insertTags = async (tags: string[]) => {

        const valuesString = tags.map((tag, index) => `($${index + 1})`).join();

        const query = `
        INSERT INTO tags ("tag")
        VALUES ${valuesString}
        ON CONFLICT
        DO NOTHING
        `;
        const values = tags;

        await Client.executeQuery(query, values);
    };

    /** Retrieves the ids for a list of tags */
    public static retrieveTagIds = async (tags: string[]): Promise<{ id: number }[]> => {

        const valuesString = tags.map((tag, index) => `$${index + 1}`).join();

        const query = `
        SELECT id 
        FROM tags
        WHERE tag IN (${valuesString})
        `;
        const values = tags;

        const { rows } = await Client.executeQuery(query, values);
        return rows;
    };
}