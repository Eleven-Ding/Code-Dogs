import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
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

proxyRequest.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (localStorage.getItem("token")) {
      config.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
  }
);

export const internalRequest = createAxiosInstance({
  baseURL,
});

export const request = () => {
  try {
    window;
    return proxyRequest;
  } catch (e) {
    return internalRequest;
  }
};

export type CodeDogResponseType<T> = {
  code: number;
  data: T;
  message: string;
};
