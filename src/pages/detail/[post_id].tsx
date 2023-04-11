import { GetServerSideProps } from "next";
import { getPostsDetail } from "@/request/home";
import { PostDetailType } from "@/request/home";
import { PostDetail } from "@/components/PostDetail/postDetail";
import { Comment } from "@/components/PostDetail/children/comment/comment";

export default function Detail(props: PostDetailType) {
  return (
    <>
      <PostDetail {...props}></PostDetail>
      {/* 评论数据由前端获取，因为一开始并不需要评论 */}
      <Comment></Comment>
    </>
  );
}

export async function getServerSideProps(context: GetServerSideProps) {
  // @ts-ignore
  const { post_id } = context.params;
  //   根据 post_id 获取文章详情
  try {
    const result = await getPostsDetail(post_id);
    return {
      props: {
        ...result.data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}
