import protectWithAuthentication from '../../util/middleware/protectWithAuthentcation';
import { UserService } from '../../util/services/userService';
import { WriteTutorial } from '../../util/interfaces/writeTutorial';


const handler = async (request, response) => {
    const { userId } = request;

    if (request.method === 'GET') {

    }

    if (request.method === 'POST') {

        const body = request.body as WriteTutorial;
        
    }


    response.json('Write');
};

export default protectWithAuthentication(handler);