import { request } from "@/request";
import { CodeDogResponseType } from "@/request";

export type AboutMeMd = string;

export async function getAboutMe() {
  return request()
    .get<CodeDogResponseType<AboutMeMd>>("/user/me")
    .then((res) => {
      return res.data;
    });
}
