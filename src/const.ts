import { LoginTypeItem, LoginType } from "./types/header";

export const LoginTypeList: LoginTypeItem[] = [
  {
    type: LoginType.GitHub,
    text: "GitHub",
    icon: "iconfont icon-github",
    link: "https://github.com/login/oauth/authorize?client_id=eb5bed26c16fde7dbbe3",
    color: "#333",
  },
  {
    type: LoginType.QQ,
    text: "QQ",
    icon: "iconfont icon-shejiaotubiao-03",
    link: `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101956106&redirect_uri=https://www.dingshiyi.top/auth/qq&state=${(
      Math.random() * 100
    ).toFixed(2)}`,
    color: "#4b9de7",
  },
];

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://www.dingshiyi.top:9004"
    : "http://localhost:3003";
