import { PostsList } from "@/components/PostsList/postList";
import { AppProps } from "antd";
import { GetServerSideProps } from "next";
import { PostDetailType, getPostsList } from "@/request/home";
import { Pagination } from "antd";
import { useCallback, useEffect, useState, useRef } from "react";
import CommonHead from "@/components/Head/head";
import { useRouter } from "next/router";
import { startGlobalLoading, closeGlobalLoading } from "@/utils/createLoading";

export type PostListResponse = {
  count: number;
  rows: PostDetailType[];
};
let firstFetch = false;

const limit = 8;
export default function Home(props: AppProps & { data: PostListResponse }) {
  const {
    data: { rows, count },
  } = props;

  const [pageList, setPageList] = useState(rows);
  const isFirstFetch = useRef(false);
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
    // 第一次从服务端获取数据，就不再进行获取了
    if (!isFirstFetch.current) {
      isFirstFetch.current = true;
      return;
    }
    // back to top
    window.scrollTo(0, 0);
    // start loading if not first page
    startGlobalLoading();
    getPostsList({
      offset: (page - 1) * pageSize,
      limit: pageSize,
    })
      .then(({ data: [rows, count] }) => {
        setTotal(count);
        setPageList(rows);
        closeGlobalLoading();
        // back to top
      })
      .catch((error) => {});
    return () => {
      firstFetch = false;
    };
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
