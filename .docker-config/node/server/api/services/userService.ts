import { Profile, Account, User } from '../interfaces/models/user';
import { UserDatabaseService } from '../../database/services/user';

export class UserService {

    private uds: UserDatabaseService

    async getProfile() {
        return await this.uds.getProfile();
    }

    async getAccount() {
        return await this.uds.getAccount();
    }

    async updateProfile(payload: Profile) {
        return await this.uds.updateProfile(payload);
    }


    async updateAccount(payload: Account) {

        const { username, email, password } = payload;
    }

    async getConnect() {

    }

    async updateConnect() {

    }

    /** Return initialized instance of the class */
    public static async createInstance(userId: string): Promise<UserService> {
        const instance = new UserService();
        instance.uds = await UserDatabaseService.createInstance(userId);

        return instance;
    }
}