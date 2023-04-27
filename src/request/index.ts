import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { baseURL } from "@/const";
import { ErrorCode } from "./errrorCode";
import { store } from "@/store/store";
import { changeShowLoginPanel } from "@/store/head";

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
proxyRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // 如果为登录，进行弹窗
    if (error.response?.status === ErrorCode.Unauthorized) {
      store.dispatch(changeShowLoginPanel(true));
    }
    throw error;
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
