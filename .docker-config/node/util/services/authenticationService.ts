import jsonwebtoken from 'jsonwebtoken';
import { Config } from '../config';
import { AuthConfig } from '../authConfig';
import { serialize } from 'cookie';
import nookies from 'nookies';

const { zerochassClientCookie, zerochassServerCookie } = AuthConfig;

/** Signs a user in */
const signIn = async (accessToken: string, userId: number, request, response) => {

    const jwt = generateJwt(accessToken, userId);
    const expires = new Date(Date.now() + AuthConfig.cookieExpiration);

    // Create cookies
    nookies.set(null, zerochassServerCookie, jwt, { httpOnly: true, expires });
    nookies.set(null, zerochassClientCookie, JSON.stringify({ authenticated: true, expires: expires.getTime() }), { httpOnly: false, expires });

    // Send the response
    response.writeHead(307, { Location: '/' });
    response.end();
};

/** Logs a user out */
const logOut = (request, response) => {
    nookies.destroy(null, zerochassServerCookie);
    nookies.destroy(null, zerochassClientCookie);
};

/** Returns generated jwt using the provided access token */
const generateJwt = (accessToken: string, userId: number) => {

    // Create jwt token with expiration
    const token = jsonwebtoken.sign({ accessToken, userId }, Config.zerochassSecret, { expiresIn: AuthConfig.tokenExpiration });
    return token;
};

/** Serializes cookie */
const serializeCookie = (cookieName: string, cookieValue: any, options: any) => {
    return serialize(cookieName, cookieValue, options);
};

export const AuthenticationService = {
    signIn,
    logOut
};
