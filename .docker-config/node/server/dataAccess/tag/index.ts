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
};