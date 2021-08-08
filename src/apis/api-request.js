import axios from 'axios';
import { message as antMessage } from 'antd';
import { getCrmContext } from '../utils'
const ctx = getCrmContext();
antMessage.config({ maxCount: 1 });
// api请求实例
const domain = process.env.NODE_ENV === 'development' ? process.env.SERVER_DOMAIN : SERVER.SERVER_DOMAIN;
const instance = axios.create({
  baseURL: domain + '/api/v1',
  timeout: 20000,
  headers: {
    'userToken': ctx.userToken
  }
});
// 响应拦截器
instance.interceptors.response.use(function(res) {
  const { code } = res.data;
  return {
    success: code === 0,
    ...res.data
  };
}, function (error) {
  console.log(error);
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance
