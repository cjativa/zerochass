import { Tag } from '../../util/database/classes/tag';

const handler = async (request, response) => {

    const { tag } = request.query;
    const matchingTags = await Tag.findMatchingTag(tag);

    response.json(matchingTags);
};

export default handler