import protectWithAuthentication from '../../util/middleware/protectWithAuthentcation';
import { UserService } from '../../util/services/userService';

const handler = async (request, response) => {
    const { userId } = request;
    const { body } = request;
    console.log(userId);
    console.log(body);
    response.json('Write');
};

export default protectWithAuthentication(handler);