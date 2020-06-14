import { TagDatabaseService } from '../database/classes/tagDatabaseService';

export class TagService {

    public static async findMatchingTag(term: string) {

        const tags = await TagDatabaseService.findMatchingTag(term);
        return tags;
    };
}