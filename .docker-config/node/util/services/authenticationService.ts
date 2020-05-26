import jsonwebtoken from 'jsonwebtoken';
import { Config } from '../config';
import { AuthConfig } from '../authConfig';
import nookies from 'nookies';

const { zerochassClientCookie, zerochassServerCookie } = AuthConfig;

/** Signs a user in */
const signIn = async (accessToken: string, userId: number, req, res) => {

    const jwt = generateJwt(accessToken, userId);
    const expires = new Date(Date.now() + AuthConfig.cookieExpiration);

    // Create cookies
    nookies.set({ res }, zerochassServerCookie, jwt, { httpOnly: true, expires, path: "/" });
    nookies.set({ res }, zerochassClientCookie, JSON.stringify({ authenticated: true, expires: expires.getTime() }), { httpOnly: false, expires, path: "/" });
};

/** Logs a user out */
const logOut = (request, response) => {
    console.log(`Logging out?`);
    nookies.destroy(null, zerochassServerCookie);
    nookies.destroy(null, zerochassClientCookie);
};

/** Returns generated jwt using the provided access token */
const generateJwt = (accessToken: string, userId: number) => {

    // Create jwt token with expiration
    const token = jsonwebtoken.sign({ accessToken, userId }, Config.zerochassSecret, { expiresIn: AuthConfig.tokenExpiration });
    return token;
};

export const AuthenticationService = {
    signIn,
    logOut
};
