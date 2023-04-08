import { request } from "@/request";
import { CodeDogResponseType } from "@/request";

export type GetPostsListParams = {
  offset: number;
  limit: number;
};

export type PostDetailType = {
  post_id: number;
  user_id: number;
  post_url?: string;
  post_title: string;
  post_description: string;
  view_count: number;
  post_content: string;
  post_state: number;
  createdAt: string;
  updatedAt: string;
};

export function getPostsList(params: GetPostsListParams) {
  return request()
    .get<CodeDogResponseType<[PostDetailType[], number]>>("/post/all", {
      params,
    })
    .then((res) => res.data);
}

export function getPostsDetail(post_id: number) {
  return request()
    .get<CodeDogResponseType<PostDetailType>>("/post/detail", {
      params: {
        post_id,
      },
    })
    .then((res) => res.data);
}
