import { Client } from '../client';

export class TagDatabaseService {

    /** Find tags given a search term */
    public static findMatchingTag = async (term: string) => {

        const query = `
        SELECT 
        "id", "tag"
        FROM tags
        WHERE "tag" LIKE '%${term}%'
        `;

        const { rows } = await Client.executeQuery(query);
        return rows;
    };

    /** Adds tags to the database. Does nothing for any provided tags that are pre-existing in the database  */
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
    public static retrieveTagIds = async (tags: string[]): Promise<{ id: number, tag: string }[]> => {

        const valuesString = tags.map((tag, index) => `$${index + 1}`).join();

        const query = `
        SELECT "id", "tag" 
        FROM tags
        WHERE tag IN (${valuesString})
        `;
        const values = tags;

        const { rows } = await Client.executeQuery(query, values);

        const tagsWithIds = rows;
        return tagsWithIds;
    };

    /** Deletes any tags from the tutorial that are meant to be deleted from the tutorial */
    public static async deleteTagAssociations(providedTags: string[], existingTags: { id: number, tag: string }[]) {

        // An existing tag would be deleted if it is not in the list of provided tags
        const tagsToDelete = existingTags.filter((existingTag) => {

            const tagShouldBeDeleted = (providedTags
                .some((providedTag) => providedTag === existingTag.tag) == false);

            return tagShouldBeDeleted;
        });

        console.log(`The tags to delete`);
        console.log(tagsToDelete);
    };

    /** Associates tutorial with a list of tag ids*/
    public static async createTagAssociations(tutorialId: number, tags: { id: number, tag: string }[]) {

        const valueString = tags.map((tag, index) => {
            const counter = index + 1;
            const first = counter + index;
            const second = first + 1;
            return `($${first}, $${second})`
        }
        ).join();
        const values = tags.reduce((acc, tag) => {
            acc.push(tag.id, tutorialId);
            return acc;
        }, []);

        const query = `
        INSERT INTO tutorial_tag_relations ("tagId", "tutorialId")
        VALUES ${valueString}
        ON CONFLICT
        DO NOTHING
        `;

        await Client.executeQuery(query, values);
    };
}