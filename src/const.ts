import { LoginTypeItem, LoginType } from "./types/header";

export const LoginTypeList: LoginTypeItem[] = [
  {
    type: LoginType.GitHub,
    text: "GitHub",
    icon: "iconfont icon-github",
    link: "https://github.com/login/oauth/authorize?client_id=eb5bed26c16fde7dbbe3",
  },
  {
    type: LoginType.QQ,
    text: "QQ登录",
    icon: "iconfont icon-shejiaotubiao-03",
    link: "https://github.com/login/oauth/authorize?client_id=eb5bed26c16fde7dbbe3",
  },
];

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://www.dingshiyi.top:9004"
    : "http://localhost:3003";
