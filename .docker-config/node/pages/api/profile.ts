import authenticated from '../../util/middleware/authenticated';
import { UserService } from '../../util/services/userService';

const handler = async (request, response) => {
    const { userId, accessToken } = request;
    const profile = await UserService.getProfileInformation(userId);
    response.json(profile);
};

export default authenticated(handler);