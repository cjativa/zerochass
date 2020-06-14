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
}