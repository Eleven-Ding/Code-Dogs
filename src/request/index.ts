import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const createAxiosInstance = (
  config?: AxiosRequestConfig
): AxiosInstance => {
  const instance = axios.create({
    timeout: 1000, //超时配置
    withCredentials: true, //跨域携带cookie
    ...config, // 自定义配置覆盖基本配置
  });

  return instance;
};

export const proxyRequest = createAxiosInstance({
  baseURL: "/api",
});
