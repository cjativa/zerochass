import { AxiosRequestConfig, Method } from 'axios';
import { Config } from '../../config';

export class CraftAxiosConfig implements AxiosRequestConfig {

    method: Method;
    url: string = 'gqlApi';
    baseURL: string = Config.craftCMSUrl;
    headers: { "Content-Type": 'application/json' };
    data: any;

    constructor(method: Method, data?: any) {
        this.method = method;

        if (data !== undefined) {
            this.data = data;
        }
    }
}