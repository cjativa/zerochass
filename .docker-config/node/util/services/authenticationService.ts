import jsonwebtoken from 'jsonwebtoken';
import { Config } from '../config';
import { AuthConfig } from '../authConfig';
import nookies from 'nookies';

const { zerochassClientCookie, zerochassServerCookie } = AuthConfig;

/** Signs a user in */
const signIn = async (accessToken: string, userId: number, profileImageUrl, res) => {

    const jwt = generateJwt(accessToken, userId, profileImageUrl);
    const expires = new Date(Date.now() + AuthConfig.cookieExpiration);

    // Create cookies
    nookies.set({ res }, zerochassServerCookie, jwt, { httpOnly: true, expires, path: "/" });
    nookies.set({ res }, zerochassClientCookie, JSON.stringify({ authenticated: true, expires: expires.getTime() }), { httpOnly: false, expires, path: "/" });
};

/** Logs a user out */
const logOut = (req, res) => {
    console.log(`Logging out?`);
    nookies.destroy({ res }, zerochassServerCookie, { path: "/" });
    nookies.destroy({ res }, zerochassClientCookie, { path: "/" });
    return res;
};

/** Returns generated jwt using the provided access token */
const generateJwt = (accessToken: string, userId: number, profileImageUrl: string) => {

    // Create jwt token with expiration
    const token = jsonwebtoken.sign({ accessToken, userId, profileImageUrl }, Config.zerochassSecret, { expiresIn: AuthConfig.tokenExpiration });
    return token;
};

export const AuthenticationService = {
    signIn,
    logOut
};
