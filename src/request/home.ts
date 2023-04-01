import { proxyRequest } from "@/request";

export type GetPostsListParams = {
  offset: number;
  limit: number;
};

export function getPostsList(params: GetPostsListParams) {
  return proxyRequest
    .get("/post/all", {
      params,
    })
    .then((res) => res.data);
}
