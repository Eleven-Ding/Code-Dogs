import { useState } from "react";
import { PostDetailType } from "@/request/home";
import styles from "./postList.module.scss";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { PostItemBasicInfo } from "./children/basicInfo/basicInfo";
import { Loading } from "@/common/Loading/Loading";

export function PostItem(props: PostDetailType) {
  const {
    post_title,
    post_description,
    post_url,
    view_count,
    createdAt,
    post_id,
    comment_count,
  } = props;

  const [imageLoaded, updateImageLoaded] = useState(false);
  const router = useRouter();

  const goToPostDetail = useCallback(() => {
    router.push(`/detail/${post_id}`);
  }, [post_id, router]);

  const handleImageLoaded = useCallback(() => {
    updateImageLoaded(true);
  }, []);

  return (
    <div
      className={styles["post-item-container"]}
      style={{ padding: "10px 4px", marginTop: "10px" }}
      onClick={goToPostDetail}
    >
      {/* 标题 */}
      <h2>{post_title}</h2>
      {/* 基本信息 */}
      <PostItemBasicInfo
        createdAt={createdAt}
        view_count={view_count}
        comment_count={comment_count}
      ></PostItemBasicInfo>
      {/* 图片描述 */}
      {post_url && (
        <div className={styles[`image-container`]}>
          <Loading show={!imageLoaded} />
          <Image
            src={post_url}
            alt="ElevenDing 前端技术博客"
            fill={true}
            loading={"lazy"}
            style={{
              objectFit: "cover",
              visibility: imageLoaded ? "initial" : "hidden",
            }}
            quality={40}
            onLoad={handleImageLoaded}
          ></Image>
        </div>
      )}
      <div className={styles["post-description"]}>{post_description}</div>
    </div>
  );
}
