import { AuthenticationService } from '../../util/services/authenticationService';

export default async (request, response) => {
    AuthenticationService.logOut(request, response);
    response.json(true);
};