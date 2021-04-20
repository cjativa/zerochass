import { Knex } from '../../database/knex';
import { makeTag } from '../../models/tag/index';
import { ITag } from '../../models/tag/tagSchema';

export class TagDAO {

    public static async listTags(): Promise<ITag[]> {
        return await Knex
            .select('*')
            .from('tags')
    };

    public static async findTag(prop, value): Promise<ITag[]> {
        return await Knex
            .select('*')
            .from('tags')
            .where(prop, value);
    };

    public static async relateWithTutorial(tags: string[], tutorialId: string | number) {
        const insertableTags = tags.map((tag) => {
            return { tag }
        });

        // Add any tags that don't exist in the schema
        await Knex('tags')
            .insert(insertableTags)
            .onConflict('tag')
            .ignore();

        // Get the ids for these tags
        const tagIds = await Knex('tags')
            .select('id')
            .whereIn('tag', tags);

        // Turn them into the tag/tutorial id pairs
        const tutorialTagPairs = tagIds.map((tagId) => {
            return {
                tagId: tagId.id,
                tutorialId,
            }
        });

        await Knex('tutorial_tag_relations')
            .insert(tutorialTagPairs)
            .onConflict(['tagId', 'tutorialId'])
            .ignore();
    };
};