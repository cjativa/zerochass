import jsonwebtoken from 'jsonwebtoken';
import { Config } from '../config';
import nookies from 'nookies';

/** Verifies if a user is authenticated */
const verifyAuthenticated = (request, response) => {

    // Check if there's a zerochassServerCookie on the request -- if it does exist, the jwt will be available
    const { zerochassServerCookie, zerochassClientCookie } = nookies.get();

    // If there's no jwt, reject immediately
    if (!zerochassServerCookie) response.status(401).json(`Invalid or missing authorization token`);

    // Else there's a token, let's see if it's valid
    else {
        const userPayload = jsonwebtoken.verify(zerochassServerCookie, Config.zerochassSecret) as object;

        // If the token is invalid (i.e. no payload), clear the cookie and let client know
        if (!userPayload) {
            nookies.destroy(null, zerochassServerCookie);
            nookies.destroy(null, zerochassClientCookie);
            response.status(401).json(`Invalid or missing authorization token`);
        }

        // Else, token is valid - let's set the userId on the request object
        else {
            console.log('Hello');
            const userId = userPayload['userId'];
            const accessToken = userPayload['accessToken'];

            request.userId = userId;
            request.accessToken = accessToken;
        }

        return request;
    }
};

/** Adds userId and access token to request object for authenticated routes to look up user information */
const authenticated = (handler) => (request, response) => {
    verifyAuthenticated(request, response);

    return handler(request, response);
};

export default authenticated;