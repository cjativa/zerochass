import { Client } from '../client';
import { SignUpInformation, UserProfileInformation } from '../../interfaces/userInterfaces';

type AuthProvider = 'GITHUB' | 'TWITTER';

const getIdForProvider = (provider: AuthProvider) => {
    if (provider === 'GITHUB') return 1;
    if (provider === 'TWITTER') return 2;
};

export class User {

    /** Signs a user up for Zerochass using the provided information */
    public static async createUser(information: SignUpInformation, provider: AuthProvider) {

        let userId: number;
        const { profileImageUrl } = information;

        // Check if the user already exists
        const { exists, userId: foundUserId } = await this.checkIfUserExists(information.uid);

        // If they don't, sign them up
        if (!exists) {
            // Get the auth provider id and userId after insertion
            const providerId = getIdForProvider(provider);
            userId = await this.insertUser(information, providerId);

            // Add their user account info
            await this.insertUserAccountInformation(information, userId);
        }

        else { userId = foundUserId };

        return { userId, profileImageUrl };
    }

    /** Inserts user information to user_information table and returns the generated user id */
    private static insertUser = async (information: SignUpInformation, providerId: number): Promise<number> => {
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
    }

    /** Inserts user account information to user_account_information table */
    private static insertUserAccountInformation = async (information: SignUpInformation, userId: number) => {
        const { email, username } = information;
        const insertUserAccountQuery = `
        INSERT INTO user_account_information ("email", "username", "userId")
        VALUES ($1, $2, $3)
        `;
        const userAccountValues = [email, username, userId];
        await Client.executeQuery(insertUserAccountQuery, userAccountValues);
    }

    /** Checks if user already exists in the database */
    public static checkIfUserExists = async (uid: number) => {

        const userExistence = {
            exists: null,
            userId: null
        };

        const checkUserQuery = `
        SELECT id 
        FROM user_information
        WHERE uid = $1
        `;
        const values = [uid];

        const { rows } = await Client.executeQuery(checkUserQuery, values);
        const { id: userId } = rows[0];

        if (rows.length > 0) {
            userExistence.exists = true;
            userExistence.userId = userId;
        }

        return userExistence;
    }

    public getProfileInformation = async (userId: number) => {

        const profileQuery = `
        SELECT * 
        FROM user_information
        WHERE id = $1
        `;
        const values = [userId];
    
        const { rows } = await Client.executeQuery(profileQuery, values);
        return rows[0];
    }

    public updateProfileInformation = async (information: UserProfileInformation, userId: number) => {
        const { name, about, website, heading, profileImage } = information;
        const updateProfileQuery = `
        UPDATE user_information 
        SET
        "name" = ($1), 
        "about" = ($2),
        "website" = ($3), 
        "heading" = ($4),  
        "profileImage" = ($5)
        WHERE "id" = ($6)
        RETURNING ("name", "about", "website", "heading", "profileImage")
        `;
        const userProfileValues = [name, about, website, heading, profileImage, userId];
        const { rows } = await Client.executeQuery(updateProfileQuery, userProfileValues);
        return rows[0];
    }
}


