import { GetServerSideProps } from "next";
import { getPostsDetail } from "@/request/home";
import { PostDetailType } from "@/request/home";
import { PostDetail } from "@/components/PostDetail/postDetail";
import { Comment } from "@/components/PostDetail/children/comment/comment";
import CommonHead from "@/components/Head/head";

export default function Detail(props: PostDetailType) {
  const { post_id, user_id, post_description, post_title } = props;
  return (
    <>
      <CommonHead title={post_title} content={post_description} />
      <PostDetail {...props}></PostDetail>
      {/* 评论数据由前端获取，因为一开始并不需要评论 */}
      <Comment post_id={post_id} user_id={user_id}></Comment>
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
