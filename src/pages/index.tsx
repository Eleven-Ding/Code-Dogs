import { PostsList } from "@/components/PostsList/postList";
import { AppProps } from "antd";
import { GetServerSideProps } from "next";
import { getPostsList } from "@/request/home";
import { Pagination } from "antd";
import { useCallback, useEffect, useState } from "react";
import { backToTop } from "@/utils/backToTop";

export type PostItemType = {
  post_id: number;
  post_url?: string;
  post_title: string;
  post_description: string;
  view_count: number;
  post_state: string;
  createdAt: string;
  updatedAt: string;
};

export type PostListResponse = {
  count: number;
  rows: PostItemType[];
};
const limit = 8;
let serverFetch = true;
export default function Home(props: AppProps & { data: PostListResponse }) {
  const {
    data: { rows, count },
  } = props;

  const [page, updatePage] = useState(1);
  const [pageList, setPageList] = useState(rows);
  const [total, setTotal] = useState(count);
  const [pageSize, setPageSize] = useState(limit);

  const handlePageSizeChange = useCallback((page: number) => {
    updatePage(page);
  }, []);
  const handleShowSizeChange = useCallback((current: number, size: number) => {
    setPageSize(size);
  }, []);

  useEffect(() => {
    // 回到顶部
    if (serverFetch) {
      serverFetch = false;
      return;
    }
    // TODO: 开始 loading
    getPostsList({
      offset: (page - 1) * pageSize,
      limit: pageSize,
    })
      .then(({ data: { count, rows } }) => {
        setTotal(count);
        setPageList(rows);
        backToTop();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // TODO: 关闭 loading
      });
  }, [page, pageSize]);
  return (
    <>
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
  let propsData = { count: 0, row: [] };
  try {
    const result = await getPostsList({
      offset: 0,
      limit,
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
