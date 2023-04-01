import { internalRequest } from "@/request";

export type GetPostsListParams = {
  offset: number;
  limit: number;
};

export function getPostsList(params: GetPostsListParams) {
  return internalRequest
    .get("/post/all", {
      params,
    })
    .then((res) => res.data);
}
