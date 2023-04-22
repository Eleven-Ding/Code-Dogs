/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { PostDetailType } from "@/request/home";
import styles from "./postList.module.scss";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { PostItemBasicInfo } from "./children/basicInfo/basicInfo";
import { LazyImage } from "@/common/LazyImage/lazyImage";
import { getDeQualifiedImageUrl } from "@/utils";


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

  const router = useRouter();

  const goToPostDetail = useCallback(() => {
    router.push(`/detail/${post_id}`);
  }, [post_id, router]);

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
      {/* 图片描述 ，懒加载*/}
      {post_url && (
        <div className={styles[`image-container`]}>
          {/* <Loading show={!imageLoaded} /> */}
          <LazyImage
            src={getDeQualifiedImageUrl(post_url, {
              quality: 40,
            })}
            alt={post_title + "EleveDing 前端技术博客"}
            lazy={true}
          />
        </div>
      )}
      <div className={styles["post-description"]}>{post_description}</div>
    </div>
  );
}
