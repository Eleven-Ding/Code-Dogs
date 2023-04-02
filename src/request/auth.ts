import { proxyRequest } from "@/request";
import { User, Token } from "@/types/auth";
import { LoginType } from "@/types/header";
export type CodeDogResponseType<T> = {
  code: number;
  data: T;
  message: string;
};

export async function login(code: string, type: LoginType) {
  return proxyRequest
    .get<
      CodeDogResponseType<{
        userInfo: User;
        token: Token;
      }>
    >("/auth/login", {
      params: {
        code,
        type,
      },
    })
    .then((res) => {
      return res.data;
    });
}
