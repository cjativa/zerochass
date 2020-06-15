import { TagDatabaseService } from '../../util/database/classes/tagDatabaseService';

const handler = async (request, response) => {

    const { tag } = request.query;
    const matchingTags = await TagDatabaseService.findMatchingTag(tag);

    response.json(matchingTags);
};

export default handler