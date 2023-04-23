import { request } from "@/request";
import { CodeDogResponseType } from "@/request";

export async function updatePostViewCount(post_id: number) {
  return request().post<CodeDogResponseType<any>>("/post/updateView", {
    post_id,
  });
}
