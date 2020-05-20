import axios, { AxiosRequestConfig } from 'axios';
import { Config } from '../config';

interface RequestConfig {
    method: any,
    data?: any
}

const method = 'POST' as any;
const url = `gqlApi`;
const baseURL = process.env.NEXT_PUBLIC_CRAFT_CMS_URL;
const headers = { "Content-Type": 'application/json' };

/** Sends a GraphQL request to the Craft GraphQL endpoint */
export const CraftQL = async (query: string, params?: any): Promise<any> => {
    let axiosConfig = { method, url, baseURL, headers, data: { query } } as AxiosRequestConfig;

    if (params) {
        axiosConfig = { ...axiosConfig, params };
    }

    try {
        const payload = (await axios(axiosConfig)).data.data.entries;
        return payload;
    }

    catch (error) {
        console.log(`An error occurred executing a ${method.toUpperCase()} to ${process.env.NEXT_PUBLIC_CRAFT_CMS_URL}`, JSON.stringify(error), '\n\n\n');
    }
};