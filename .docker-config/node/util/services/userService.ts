import { Client } from '../database/client';
import { SignUpInformation } from '../interfaces/userInterfaces';

type AuthProvider = 'GITHUB' | 'TWITTER';

const getIdForProvider = (provider: AuthProvider) => {
    if (provider === 'GITHUB') return 1;
    if (provider === 'TWITTER') return 2;
};

/** Signs a user up for Zerochass using the provided information */
const signUp = async (information: SignUpInformation, provider: AuthProvider) => {

    // Get the auth provider id and userId after insertion
    const providerId = getIdForProvider(provider);
    const userId = await insertUser(information, providerId);

    // Add their user account info
    await insertUserAccountInformation(information, userId);
};

/** Inserts user information to user_information table and returns the generated user id */
const insertUser = async (information: SignUpInformation, providerId: number): Promise<number> => {
    const { name, profileImageUrl, uid } = information;

    const insertUserQuery = `
    INSERT INTO user_information ("name", "profileImage", "uid", "auth_provider") 
    VALUES ($1, $2, $3, $4)
    RETURNING id
    `;
    const userValues = [name, profileImageUrl, uid, providerId];

    const { rows } = await Client.executeQuery(insertUserQuery, userValues);
    const { id } = rows[0];

    return id as number;
};

/** Inserts user account information to user_account_information table */
const insertUserAccountInformation = async (information: SignUpInformation, userId: number) => {
    const { email, username } = information;
    const insertUserAccountQuery = `
    INSERT INTO user_account_information ("email", "username", "userId")
    VALUES ($1, $2, $3)
    `;
    const userAccountValues = [email, username, userId];
    await Client.executeQuery(insertUserAccountQuery, userAccountValues);
};


export const UserService = {
    signUp
};