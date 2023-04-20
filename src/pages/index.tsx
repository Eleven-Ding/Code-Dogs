import { PostsList } from "@/components/PostsList/postList";
import { AppProps } from "antd";
import { GetServerSideProps } from "next";
import { PostDetailType, getPostsList } from "@/request/home";
import { Pagination } from "antd";
import { useCallback, useEffect, useState } from "react";
import CommonHead from "@/components/Head/head";
import { useRouter } from "next/router";

export type PostListResponse = {
  count: number;
  rows: PostDetailType[];
};
const limit = 8;
export default function Home(props: AppProps & { data: PostListResponse }) {
  const {
    data: { rows, count },
  } = props;

  const [pageList, setPageList] = useState(rows);
  const [total, setTotal] = useState(count);
  const [pageSize, setPageSize] = useState(limit);
  const router = useRouter();
  const [page, updatePage] = useState(Number(router.query.page) || 1);

  const handlePageSizeChange = useCallback((page: number) => {
    updatePage(page);
  }, []);
  const handleShowSizeChange = useCallback((current: number, size: number) => {
    setPageSize(size);
  }, []);

  useEffect(() => {
    router.push({
      pathname: "/",
      query: {
        page: page,
        limit: pageSize,
      },
    });
    getPostsList({
      offset: (page - 1) * pageSize,
      limit: pageSize,
    })
      .then(({ data: [rows, count] }) => {
        setTotal(count);
        setPageList(rows);
      })
      .catch((error) => {});
  }, [page, pageSize]);
  return (
    <>
      <CommonHead
        title="前端技术博客"
        content={pageList.reduce((pre, cur) => {
          return pre + cur.post_title + cur.post_description;
        }, "")}
      />
      <PostsList count={total} rows={pageList}></PostsList>
      <Pagination
        style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}
        total={count}
        pageSize={pageSize}
        current={page}
        onChange={handlePageSizeChange}
        responsive
        onShowSizeChange={handleShowSizeChange}
        pageSizeOptions={[8, 12, 20]}
      ></Pagination>
    </>
  );
}

export async function getServerSideProps(context: GetServerSideProps) {
  let rows: PostDetailType[] = [];
  let count: number = 0;
  try {
    const result = await getPostsList({
      offset: 0,
      limit,
    });
    [rows, count] = result.data;
  } catch (error) {}
  return {
    props: {
      data: {
        rows,
        count,
      },
    },
  };
}
