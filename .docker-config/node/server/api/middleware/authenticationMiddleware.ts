import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as jwkToPem from 'jwk-to-pem';

import * as jwks from '../../private/jwks.json';

export const isUserAuthenticated = async (request: express.Request, response: express.Response, next) => {

    const token = getBearerToken(request)

    if (token) {

        try {
            const payload = await validateToken(token);

            // If validated, add the uid to the request
            request['uid'] = payload.sub;
            next();
        }

        catch (error) {
            response.status(403).json({
                status: 403,
                message: 'AUTHORIZATION EXPIRED'
            });
        }
    }

    else {
        return response.status(403).json({
            status: 403,
            message: 'NO AUTHORIZATION PROVIDED'
        });
    }
}

const getBearerToken = (request: express.Request) => {

    const authorizationHeader = request.headers.authorization;

    // If authorization header is presented and 'Bearer' string is present
    if (authorizationHeader && authorizationHeader.split(' ')[0] === 'Bearer') {

        const token = authorizationHeader.split(' ')[1];

        return token;
    }

    else {
        return null
    }
};

const validateToken = async (token: string): Promise<any> => {

    const pem = jwkToPem(jwks.keys[1]);

    return await new Promise((resolve, reject) => {
        jwt.verify(token, pem, (error, payload) => {

            if (error) {
                console.log('Could not verify token', JSON.stringify(error));
                reject();
            }
            resolve(payload);
        });
    });
}