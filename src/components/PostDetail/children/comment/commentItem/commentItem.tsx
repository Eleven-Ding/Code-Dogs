import { CommontItemType } from "@/request/home";
import { User } from "@/types/auth";
import { formatPostItemTime } from "@/utils/format";
import styles from "./commentItem.module.scss";
import Image from "next/image";
import { lazy } from "react";

export type CommontItemProps = { comment: CommontItemType; user_id: string };
export function CommentItem({ comment, user_id }: CommontItemProps) {
  const { user, content, createdAt, position } = comment;
  const { username, avatar_url } = user || ({} as User);
  return (
    <div className={styles["comment-item-container"]}>
      <Image
        width={30}
        height={30}
        src={avatar_url}
        alt="ElevenDing 前端技术博客"
        loading={"lazy"}
      ></Image>
      <div className={styles["comment-right-info"]}>
        <div className={styles["comment-top-info"]}>
          <span className={styles["username"]}>
            {username}
            {user.user_id === user_id && (
              <span className={styles["post-author"]}>作者</span>
            )}
          </span>
          <span className={styles["position"]}>
            {position || "四川 - 成都"}
          </span>
          <span className={styles["createTime"]}>
            {formatPostItemTime(createdAt)}
          </span>
        </div>
        <p>{content}</p>
        <div className={styles["comment-operations"]}>
          <span>
            <i className="iconfont icon-comment"></i>回复
          </span>
          {/* TODO: 只展示 id === 自己的id的删除按钮 */}
          <span>
            <i className="iconfont icon-delete"></i>删除
          </span>
          <span>
            <i className="iconfont icon-dianzan"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
