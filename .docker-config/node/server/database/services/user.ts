import { Profile, Account } from '../../api/interfaces/models/user';
import { usersTables as t } from '../tables';
import { knex } from '../knex';

export class UserDatabaseService {

    private userId: string;

    /** Exchanges the uid for the id of the user row in the database */
    private async setId(uid: string) {

        try {
            const rows = await knex
                .from(t.users)
                .select('id')
                .where('uid', uid);

            // Meaning we've located our user
            if (rows.length > 0) {
                this.userId = rows[0].id;
            }
        }

        catch (error) {
            console.log(`Could not fetch id assigned to User Id ${uid}`, error);
        }
    }

    /** Fetches the profile data for the current user */
    async getProfile(): Promise<Profile> {

        try {
            const rows = await knex
                .from(t.usersProfiles)
                .select('name', 'about_me AS aboutMe', 'website', 'heading')
                .where('user_id', this.userId);

            return rows[0];
        }

        catch (error) {
            console.log(`Could not get profile information for uid ${this.userId}`);
        }
    }

    /** Fetches the account data for the current user */
    async getAccount(): Promise<Account> {

        try {
            const rows = await knex
                .from(t.usersAccounts)
                .select('email', 'username')
                .where('user_id', this.userId);

            return rows[0]; 
        }

        catch (error) {
            console.log(`Could not get account information for uid ${this.userId}`);
        }
    }

    /** Updates the profile data for the current user */
    async updateProfile(payload: Profile) {

        const { heading, name, aboutMe, website } = payload;

        try {
            const rows = await knex
                .from(t.usersProfiles)
                .where('user_id', this.userId);

            if (rows.length === 0) {
                await knex
                    .from(t.usersProfiles)
                    .insert({ heading, name, about_me: aboutMe, website, user_id: this.userId });
            }

            else {
                await knex
                    .from(t.usersProfiles)
                    .update({ heading, name, about_me: aboutMe, website })
                    .where('user_id', this.userId);
            }
        }

        catch (error) {
            console.log(`Could not insert or update profile information for uid ${this.userId}`, error)
        }
    }

    /** Updates the account information for the current user */
    async updateAccount(payload: Account) {

        const { email, username } = payload;

        try {
            const rows = await knex
                .from(t.usersAccounts)
                .where('user_id', this.userId);

            if (rows.length === 0) {
                await knex
                    .from(t.usersAccounts)
                    .insert({ email, username, user_id: this.userId });
            }

            else {
                await knex
                    .from(t.usersAccounts)
                    .update({ email, username })
                    .where({ user_id: this.userId });
            }
        }

        catch (error) {
            console.log(`Could not insert or update account information for uid ${this.userId}`, error)
        }
    }

    /** Creates user in the Users table */
    async createUser(uid: string, email: string, username: string) {

        try {
            const rows = await knex
                .from(t.users)
                .insert({ uid })
                .returning('id');

            this.userId = rows[0];

            await this.updateAccount({ email, username });
        }

        catch (error) {
            console.log(`Could not insert uid ${uid} into Users table`, error);
        }
    }

    /** Return initialized instance of the class */
    public static async createInstance(uid: string): Promise<UserDatabaseService> {
        const instance = new UserDatabaseService();
        await instance.setId(uid);

        return instance;
    }
} 