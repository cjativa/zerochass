import { AxiosRequestConfig, Method } from 'axios';

export class AxiosConfig implements AxiosRequestConfig {

    url: string;
    method: Method;
    data: any;

    baseURL: string;
    headers: {};

    constructor(url: string, method: Method, data?: any) {

        this.url = url;
        this.method = method;
        
        if (data !== undefined) { this.data = data; }

        this.headers = { 'Content-Type': 'application/json' };
        this.baseURL = "/api";
    }

    public setHeader(header: string, value: string) {
        this.headers[header] = value;
    }
    
}