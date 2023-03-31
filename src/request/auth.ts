import { proxyRequest } from "@/request";
import { User, Token } from "@/types/auth";
export type CodeDogResponseType<T> = {
  code: number;
  data: T;
  message: string;
};

export async function login(code: string) {
  return proxyRequest
    .get<
      CodeDogResponseType<{
        userInfo: User;
        token: Token;
      }>
    >("/auth/login", {
      params: {
        code,
      },
    })
    .then((res) => {
      return res.data;
    });
}
