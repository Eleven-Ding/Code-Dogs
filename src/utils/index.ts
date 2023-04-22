import { CommontItemType } from "@/request/home";
import { User } from "@/types/auth";

export function getUserInfoFromLocalStorage(): User {
  try {
    return JSON.parse(localStorage.getItem("userInfo")!) as User;
  } catch (error) {
    return {} as User;
  }
}

// 组装对应质量的图片
export function getDeQualifiedImageUrl(
  url: string,
  params: {
    quality: number;
  }
): string {
  return url + `?imageView2/q/${params.quality}`;
}

// 根据 createComment 返回的数据组装评论数据，减少打接口的时间
export function assembleComment(comment: CommontItemType) {
  return {
    ...comment,
    children: [],
    user: getUserInfoFromLocalStorage(),
    childrenCommentCount: 0,
  };
}

