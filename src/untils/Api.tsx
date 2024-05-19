import axios from 'axios';
import { HOST_BE } from '../common/Common';

export const GetGuestApi = (url: string) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${HOST_BE}${url}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return axios.request(config);
};
export const PostGuestApi = (url: string, data: object) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${HOST_BE}${url}`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    };

    return axios.request(config);
};
export const GetApi = (url: string,token:string | null) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${HOST_BE}${url}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    return axios.request(config);
};
