import axios from 'axios';
const http = axios.create();

// 请求拦截
http.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// 响应拦截
http.interceptors.response.use(
    response => {
        return response.data;
    },
    err => {
        return Promise.reject(err);
    }
);

export default http;