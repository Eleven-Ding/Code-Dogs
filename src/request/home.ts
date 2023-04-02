import { request } from "@/request";

export type GetPostsListParams = {
  offset: number;
  limit: number;
};

export function getPostsList(params: GetPostsListParams) {
  return request()
    .get("/post/all", {
      params,
    })
    .then((res) => res.data);
}
