import { useEffect, useState } from 'react';
import axios, { Method } from 'axios';

interface IHookReturn {
    performRequest: (props: IPerformRequestProps) => Promise<any>,
    responseData: any,
    requestInProgress: boolean,
};

interface IPerformRequestProps {
    endpoint: string,
    method: Method,

    params?: object,
    payload?: object,

    onSuccess?: (data: any) => void,
    onError?: (error: any) => void,
};

export const useAxios = (): IHookReturn => {

    const [requestInProgress, setRequestInProgress] = useState(false);
    const [responseData, setResponseData] = useState();

    const performRequest = async ({ endpoint, method, params, payload, onSuccess, onError }: IPerformRequestProps): Promise<any> => {
        const fullEndpoint = `/api/${endpoint}/`;
        setRequestInProgress(true);
        let response; 

        try {
            const { data } = await axios({
                url: fullEndpoint,
                method,
                data: payload,
                params,
            });

            response = data;
            setResponseData(data);

            if (onSuccess) {
                onSuccess(data);
            }
        }

        catch (error) {
            console.log(`An error occurred sending a ${method} request to the endpoint ${fullEndpoint}`, error);

            if (onError) {
                onError(error);
            }
        }

        finally {
            setRequestInProgress(false);
            return response;
        }
    };

    return {
        performRequest,
        responseData,
        requestInProgress,
    };
};