import { Config } from '../../config';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

import { UserDatabaseService } from '../../database/services/user';

const globalAny: any = global;
globalAny.fetch = require('node-fetch');

const poolData = {
    UserPoolId: Config.cognitoUserPoolId,
    ClientId: Config.cognitoWebClientId
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


export class AuthenticationService {

    async login(username: string, password: string): Promise<AuthenticationResponse> {

        try {
            const authData = { Username: username, Password: password, Pool: userPool };
            const authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData);

            const userData = { Username: username, Pool: userPool };
            const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

            const response = await new Promise<AmazonCognitoIdentity.CognitoUserSession>((resolve, reject) => {
                cognitoUser.authenticateUser(authDetails, {
                    onSuccess: (result) => {
                        resolve(result);
                    },

                    onFailure: (error) => {
                        reject(error);
                    }
                });
            });

            // Get the needed tokens and user id
            const access = response.getAccessToken().getJwtToken();
            /* const refresh = response.getRefreshToken().getToken(); */
            const uid = response.getAccessToken().payload.sub;

            // Get the user data
            const userPayload = await this.postLogin(uid);

            return new LoginResponse(true, 'Successfully logged in', new Tokens(/* refresh,  */access), userPayload);
        }

        catch (error) {
            return new LoginResponse(false, `${error.message}`, null, null);
        }
    }

    signOut(username: string) {

        const userData = { Username: username, Pool: userPool };
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        cognitoUser.signOut();

        return true;
    }

    async signUp(username: string, email: string, password: string): Promise<AuthenticationResponse> {

        const dataEmail = { Name: 'email', Value: email };
        const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

        /* const dataPreferredUsername = { Name: 'preferred_username', Value: username };
        const attributePreferredUsername = new AmazonCognitoIdentity.CognitoUserAttribute(dataPreferredUsername); */

        const attributeList = [attributeEmail, /* attributePreferredUsername */];

        try {
            // If successful, user will be signed up but not confirmed -- and will not be able to sign in until they are confirmed
            const response = await new Promise<AmazonCognitoIdentity.ISignUpResult>((resolve, reject) => {
                userPool.signUp(username, password, attributeList, null, (error, result) => {
                    if (error) { reject(error); }
                    resolve(result);
                });
            });

            // After successful sign up, initiate creating them in the user table
            const uid = response.userSub;
            this.postSignUp(username, email, uid);

            return new AuthenticationResponse(true, `Successfully signed up user`);
        }

        catch (error) {
            console.log(error);
            return new AuthenticationResponse(false, `Could not sign up user. ${error.message}`);
        }
    }

    async verifyAccount(code: any, username: any, clientId: any, email: any) {

        try {
            const userData = { Username: username, Pool: userPool };
            const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

            const response = await new Promise((resolve, reject) => {
                cognitoUser.confirmRegistration(code, true, (error, result) => {
                    if (error) { reject(error); }

                    resolve(result);
                });
            });

            return response;
        }

        catch (error) {
            console.log(`Could not confirm user account`, error);
        }
    }

    async refreshSession(refreshToken: string) {

        new AmazonCognitoIdentity.CognitoUser(null).refreshSession(new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: refreshToken }), (error, result) => {
            if (error) {
                console.log(`Could not refresh the token`, error);
            }
            console.log(result);
        });
    }

    /** Adds the signed up username, their user id, and email to the Zerochass database */
    private async postSignUp(username: string, email: string, uid: string) {

        const uds = new UserDatabaseService();
        await uds.createUser(uid, email, username);
    }

    /** Fetches the username, email, and name for the user id */
    private async postLogin(uid: string): Promise<LoggedInUserPayload> {

        const uds = await UserDatabaseService.createInstance(uid);
        const { username, email } = await uds.getAccount();
        const { name } = await uds.getProfile();

        return new LoggedInUserPayload(username, email, name);
    }
}

export class AuthenticationResponse {
    success: boolean;
    message: string;

    constructor(success: boolean, message: string) {
        this.success = success;
        this.message = message;
    }
}

export class LoginResponse extends AuthenticationResponse {

    tokens: Tokens;
    userPayload: LoggedInUserPayload;

    constructor(success: boolean, message: string, tokens: Tokens, userPayload: LoggedInUserPayload) {
        super(success, message);

        this.tokens = tokens;
        this.userPayload = userPayload;
    }
}

export class Tokens {

    /* refreshToken: string; */
    accessToken: string;

    constructor(/* refreshToken: string,  */accessToken: string) {
        /* this.refreshToken = refreshToken; */
        this.accessToken = accessToken;
    }
}

export class LoggedInUserPayload {

    username: string;
    email: string;
    name: string;

    constructor(username: string, email: string, name: string) {
        this.username = username;
        this.email = email;
        this.name = name;
    }
}