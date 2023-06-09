import { PostDetailType } from "@/request/home";
import Image from "next/image";
import { marked } from "marked";
import { PostItemBasicInfo } from "../PostsList/children/basicInfo/basicInfo";
import styles from "./postDetail.module.scss";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { PostFooter } from "./children/postFooter/postFooter";
import { useDispatch } from "react-redux";
import { resetCommentList } from "@/store/comment";
import { LazyImage } from "@/common/LazyImage/lazyImage";

export function PostDetail({
  post_title,
  post_url,
  post_description,
  post_content,
  createdAt,
  view_count,
  updatedAt,
  comment_count,
}: PostDetailType) {
  const router = useRouter();
  const dispatch = useDispatch();
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    // 清空缓存的评论
    dispatch(resetCommentList());
  }, [dispatch]);

  return (
    <div className={styles["post-detail-container"]}>
      <div className={styles["post-detail-go-back"]} onClick={goBack}>
        👈 返回
      </div>
      <div className={styles["post-detail-basic-info"]}>
        <h1>{post_title}</h1>
        <PostItemBasicInfo
          createdAt={createdAt}
          view_count={view_count}
          style={{ justifyContent: "center" }}
          comment_count={comment_count}
        ></PostItemBasicInfo>
        {post_url && (
          <div className={styles["post-detail-basic-info-img"]}>
            <LazyImage
              src={post_url}
              alt={post_title}
              lazy={true}
            ></LazyImage>
          </div>
        )}
        <span className={styles["post-detail-description"]}>
          {post_description}
        </span>
      </div>

      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{
          __html: marked(post_content || ""),
        }}
      ></div>
      {/* 最后更新 */}
      <PostFooter updateAt={updatedAt}></PostFooter>
      {/* Comment 组件 */}
    </div>
  );
}
