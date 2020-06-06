import protectWithAuthentication from '../../util/middleware/protectWithAuthentcation';
import { UserService } from '../../util/services/userService';

const handler = async (request, response) => {

    const { userId } = request;

    if (request.method === 'GET') {
        const profile = await UserService.getProfileInformation(userId);
        response.json(profile);
    }

    if (request.method === 'POST') {
        const { body } = request;
        const profile = await UserService.updateProfileInformation(body, userId);
        response.json(profile);
    }


};

export default protectWithAuthentication(handler);