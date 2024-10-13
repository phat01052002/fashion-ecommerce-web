import axios from 'axios';
import { HOST_BE } from '../common/Common';
import { toastError } from './Logic';

const api = axios.create({
    baseURL: HOST_BE,
});
api.interceptors.response.use(
    (response) => {
        // Nếu phản hồi thành công, trả về dữ liệu
        return response;
    },
    (error) => {
        const { response } = error;

        // Kiểm tra mã trạng thái
        if (response && response.status === 409) {
            // Thay đổi mã trạng thái thành 200 và trả về thông báo

            return Promise.resolve({
                status: 200,
                data: { success: false, message: response.data.message },
            });
        }
        if (response && response.status === 502) {
            // Thay đổi mã trạng thái thành 200 và trả về thông báo
            toastError('Fail');

            return Promise.resolve({
                status: 204,
                data: { success: false, message: '502' },
            });
        }
        if (response && response.status === 404) {
            toastError('Fail');

            return Promise.resolve({
                status: 200,
                data: { success: false, message: '404' },
            });
        }
        if (response && response.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login-register';
        }
        if (response && response.status === 500) {
            //redirect 500 page
        }
        // Trả lại lỗi cho các mã trạng thái khác
        return Promise.reject(error);
    },
);
// Thêm interceptor để xử lý token

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        //Nếu token hết hạn (401)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            localStorage.removeItem('token');
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await api.post('/auth/refreshToken', { refreshToken: refreshToken });

            if (response.status === 200) {
                const { accessToken } = response.data;
                localStorage.setItem('token', accessToken);
                api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                return api(originalRequest);
            }
        }

        return Promise.reject(error);
    },
);
export const GetGuestApi = (url: string) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${HOST_BE}${url}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return api.request(config);
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

    return api.request(config);
};
export const GetApi = (url: string, token: string | null) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${HOST_BE}${url}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    return api.request(config);
};

export const PostApi = (url: string, token: string | null, data: any) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${HOST_BE}${url}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: data,
    };

    return api.request(config);
};
