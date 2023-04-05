import { proxyRequest } from "@/request";
import { User, Token } from "@/types/auth";
import { LoginType } from "@/types/header";
import { CodeDogResponseType } from '@/request';

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
