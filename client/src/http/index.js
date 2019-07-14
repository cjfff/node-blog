import { Notification } from 'element-ui'
import axios from "axios";
import axiosExtra from "./axiosExtra";

axios.interceptors.request.use(
  config => {
    // 判断localStorage中是否存在api_token
    // if (localStorage.getItem("access_token")) {
    //   //  存在将access_token写入 request header
    //   config.headers = {
    //     "access-token": `${localStorage.getItem("access_token")}`
    //   };
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * [返回状态判断(添加响应拦截器)]
 * @return
 */
axios.interceptors.response.use(
  res => {
    if (res.status !== 200) {
      let data = res.data;

      Notification.error({
        title: res.status,
        message: data.payload || data.msg
      });

      if (res.status == 401) {
        cookieKeys.forEach(key => {
          cookie.remove(key, { path });
        });
        redirect("/login");
      }
    }

    if (res.data.code != 0) {
      res.data.msg &&
        Notification.error({
          message: res.data.msg
        });
      return Promise.reject(res);
    }

    return res;
  },
  error => {
    return Promise.resolve(error.response);
  }
);

axiosExtra(axios);

export default axios;
