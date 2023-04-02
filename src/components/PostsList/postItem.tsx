import { PostItemType } from "@/pages";
import styles from "./postList.module.scss";
import { formatPostItemTime } from "@/utils/format";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

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

  const [createTime, setCreateTime] = useState("10/10/10 00:00:00");

  useEffect(() => {
    if (!createdAt) {
      return;
    }
    setCreateTime(formatPostItemTime(createdAt));
  }, [createdAt]);

  const goToPostDetail = useCallback(() => {
    router.push(`/detail/${post_id}`);
  }, []);

  return (
    <div className={styles["post-item-container"]} onClick={goToPostDetail}>
      {/* 标题 */}
      <h2>{post_title}</h2>
      {/* 基本信息 */}
      <div className={styles["post-basic-info"]}>
        <span>
          <i className="iconfont icon-rili"></i> {createTime}
        </span>
        <span>
          <i className="iconfont icon-liulan"></i> {view_count}
        </span>
        <span>
          <i className="iconfont icon-pinglun"></i> 1
        </span>
      </div>
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
