import axios from 'axios';
import {baseUrl} from '../assets/js/common'

export function request(config) {
    const instance = axios.create({
        baseURL: baseUrl,
        timeout: 5000,
        headers: {
            'token': localStorage.getItem('token'),
        }
    })

    //拦截处理
    instance.interceptors.request.use(config => {
        //如果有接口需要认证，比如token
        //直接放行
        return config;
    }, err => {
    });

    //响应拦截
    instance.interceptors.response.use(res => {
        return res.data ? res.data : res;
    }, err => {
        //如果有错误，在这里处理
        const data = err.response.data;
        console.log(data);
        return data;
    });
    return instance(config);
}