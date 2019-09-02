
import axios, { AxiosRequestConfig, ResponseType } from 'axios';

export class Http {

    // public on40x: Function = undefined;

    public static Get(url: string, responseType: ResponseType = 'json'): Promise<any> {
        const opt: AxiosRequestConfig = {
            method: 'GET',
            url,
            responseType,
            timeout: 6 * 60 * 1000,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        };
        return new Promise((resolve, reject) => {
            axios(opt).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}
