import protectWithAuthentication from '../../util/middleware/protectWithAuthentcation';
import { UserService } from '../../util/services/userService';

const handler = async (request, response) => {
    const { userId } = request;
    const profile = await UserService.getProfileInformation(userId);
    response.json(profile);
};

export default protectWithAuthentication(handler);