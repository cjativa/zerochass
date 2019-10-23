import * as express from 'express';

import { AuthenticationService } from '../services/authenticationService';

export class AuthenticationController {

    as: AuthenticationService; 

    constructor() {
        this.as = new AuthenticationService();
    }

    signUp = async (request: express.Request, response: express.Response) => {

        const { username, email, password } = request.body;

        const ar = await this.as.signUp(username, email, password);

        response.json(ar);
    }

    login = async (request: express.Request, response) => {

        const { username, password } = request.body;

        const ar = await this.as.login(username, password);

        response.json(ar);
    }

    verifyAccount = async (request: express.Request, response) => {

        const { code, username, clientId, email } = request.query;

        const result = await this.as.verifyAccount(code, username, clientId, email);

        response.json(result);
    }

    signOut = async (request: express.Request, response) => {

        const { username } = request.body;

        const signedOut = this.as.signOut(username);

        response.json(signedOut);
    }
}
