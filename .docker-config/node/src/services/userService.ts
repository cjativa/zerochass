import axios from 'axios';
import { AxiosConfig } from '../classes/axiosConfigs';
import { ProfileInformation, AccountInformation } from '../interfaces/userPayloads';

import { Store } from '../store/store';

export class UserService {

    bearerToken: string;

    constructor() {

        // Get the store state
        // const state = Store.getState().UserState

        // Get the token
        // this.bearerToken = state['authentication']['accessToken'];
    }

    getProfileInformation = async (): Promise<ProfileInformation> => {
        const profileInformation = (await this.executeRequest('profile', 'GET')) as ProfileInformation;
        return profileInformation;
    }

    updateProfileInformation = async (profileInformation) => {
        (await this.executeRequest('profile', 'POST', profileInformation));
    }

    getAccountInformation = async (): Promise<AccountInformation> => {
        const accountInformation = (await this.executeRequest('account', 'GET')) as AccountInformation;
        return accountInformation;
    }

    getConnectInformation = async () => {
        const connectInformation = await this.executeRequest('connect', 'GET');
        console.log(connectInformation);
    }

    executeRequest = async (url: string, method: any, data?: any) => {

        let aConfig: AxiosConfig;
        const userUrl = `user/${url}`;

        // If data was passed for this request
        if (data !== undefined) {
            aConfig = new AxiosConfig(userUrl, method, data);
        }

        else { aConfig = new AxiosConfig(userUrl, method); }

        // Set the bearer token
        aConfig.setHeader('Authorization', `Bearer ${this.bearerToken}`);

        try {
            return (await axios(aConfig)).data;
        }

        catch (error) {
            console.log(`An error occurred executing a ${method} request on the resource "${url}"`, error);
        }
    }
}