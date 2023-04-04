import { PostItemType } from "@/pages";
import styles from "./postList.module.scss";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { PostItemBasicInfo } from "./children/basicInfo/basicInfo";

export function PostItem(props: PostItemType) {
  const {
    post_title,
    post_description,
    post_url,
    view_count,
    createdAt,
    post_id,
  } = props;

  const router = useRouter();

  const goToPostDetail = useCallback(() => {
    router.push(`/detail/${post_id}`);
  }, []);

  return (
    <div className={styles["post-item-container"]} onClick={goToPostDetail}>
      {/* 标题 */}
      <h2>{post_title}</h2>
      {/* 基本信息 */}
      <PostItemBasicInfo
        createdAt={createdAt}
        view_count={view_count}
      ></PostItemBasicInfo>
      {/* 图片描述 */}
      {post_url && (
        <div className={styles["image-container"]}>
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
      <div className={styles["post-description"]}>{post_description}</div>
    </div>
  );
}
