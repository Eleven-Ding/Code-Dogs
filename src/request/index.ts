import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { baseURL } from "@/const";

export const REQUEST_TIME_OUT = 10 * 1000;

const createAxiosInstance = (config?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: REQUEST_TIME_OUT, //超时配置
    withCredentials: true, //跨域携带cookie
    ...config, // 自定义配置覆盖基本配置
  });

  return instance;
};

export const proxyRequest = createAxiosInstance({
  baseURL: "/api",
});

export const internalRequest = createAxiosInstance({
  baseURL,
});
