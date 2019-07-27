import axios from 'axios';
import BaseUrl from './baseUrl'
// 创建axios实例
const service = axios.create({
    baseURL: BaseUrl, // api的base_url
    timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
    return config;
}, error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
})
// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.success != true) {
            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (res.code == 401) {

            } else {

            }
        }
        return response;
    },
    error => {
        console.log('err' + error); // for debug

        return Promise.reject(error);
    }
)

export default service;