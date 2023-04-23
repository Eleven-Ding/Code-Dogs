import { request } from "@/request";
import { CodeDogResponseType } from "@/request";

// 更新文章的浏览量
export async function updatePostViewCount(post_id: number) {
  return request().post<CodeDogResponseType<any>>("/post/updateView", {
    post_id,
  });
}

// 删除评论
export async function deleteComment(comment_id: number) {
  return request().post<CodeDogResponseType<any>>("/comment/delete", {
    comment_id,
  });
}
