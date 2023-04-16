import { User } from "@/types/auth";
export function getUserInfoFromLocalStorage(): User {
  try {
    return JSON.parse(localStorage.getItem("userInfo")!) as User;
  } catch (error) {
    return {} as User;
  }
}
