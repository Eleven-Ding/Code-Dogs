import { PostDetailType } from "@/request/home";
import Image from "next/image";
import { marked } from "marked";
import { PostItemBasicInfo } from "../PostsList/children/basicInfo/basicInfo";
import styles from "./postDetail.module.scss";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { PostFooter } from "./children/postFooter/postFooter";

export function PostDetail({
  post_title,
  post_url,
  post_description,
  post_content,
  createdAt,
  view_count,
  updatedAt
}: PostDetailType) {
  const router = useRouter();
  const goBack = useCallback(() => {
    router.back();
  }, [router]);
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
        ></PostItemBasicInfo>
        {post_url && (
          <div className={styles["post-detail-basic-info-img"]}>
            <Image
              src={post_url}
              alt="ElevenDingImage"
              fill={true}
              loading={"lazy"}
              style={{ objectFit: "cover" }}
              quality={50}
            ></Image>
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
