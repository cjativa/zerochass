import { TagService } from '../../util/services/tagService';

const handler = async (request, response) => {

    const { tag } = request.query;
    const matchingTags = await TagService.findMatchingTag(tag);

    response.json(matchingTags);
};

export default handler