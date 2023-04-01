import { PostsList } from "@/components/PostsList/postList";
import { AppProps } from "antd";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { getPostsList } from "@/request/home";

export type PostItemType = {
  post_id: number;
  post_url?: string;
  post_title: string;
  post_description: string;
  view_count: string;
  post_state: string;
  createdAt: string;
  updatedAt: string;
};

export type PostListResponse = {
  count: number;
  rows: PostItemType[];
};
export default function Home(props: AppProps & { data: PostListResponse }) {
  const {
    data: { rows, count },
  } = props;
  return (
    <>
      <PostsList count={count} rows={rows}></PostsList>
      {count}
    </>
  );
}

export async function getServerSideProps(context: GetServerSideProps) {
  let propsData = { count: 0, row: [] };
  try {
    const result = await getPostsList({
      offset: 0,
      limit: 5,
    });
    propsData = result.data;
  } catch (error) {}
  return {
    props: {
      data: {
        ...propsData,
      },
    },
  };
}
