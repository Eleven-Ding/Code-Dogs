import { request } from "@/request";
import { CodeDogResponseType } from "@/request";
import { User } from "@/types/auth";

export type GetPostsListParams = {
  offset: number;
  limit: number;
};

export type PostDetailType = {
  post_id: number;
  user_id: string;
  post_url?: string;
  post_title: string;
  post_description: string;
  view_count: number;
  post_content: string;
  post_state: number;
  createdAt: string;
  updatedAt: string;
  comment_count: number;
};

export type CommontItemType = {
  commentId: number;
  content: string;
  createdAt: string;
  status: number;
  position: string;
  parentId: number;
  user: User;
  comment_on_id: number;
  children?: CommontItemType[];
  childrenCommentCount?: number;
};

// 分页获取文章列表
export function getPostsList(params: GetPostsListParams) {
  return request()
    .get<CodeDogResponseType<[PostDetailType[], number]>>("/post/all", {
      params,
    })
    .then((res) => res.data);
}

// 获取文章详情
export function getPostsDetail(post_id: number) {
  return request()
    .get<CodeDogResponseType<PostDetailType>>("/post/detail", {
      params: {
        post_id,
      },
    })
    .then((res) => res.data);
}

// 新增评论
export function createComment(
  postId: number,
  parentId: number,
  content: string,
  replyId: number
) {
  return request()
    .post<CodeDogResponseType<null>>("/comment/create", {
      postId,
      parentId,
      content,
      comment_on_id: replyId,
    })
    .then((res) => res.data);
}

// 根据文章id获取评论
export function getCommentsByPostId(postId: number) {
  return request()
    .get<CodeDogResponseType<CommontItemType[]>>("/comment/list", {
      params: {
        postId,
        offset: 0,
        limit: 50,
      },
    })
    .then((res) => res.data);
}
