import styles from "./postFooter.module.scss";
import { formatPostItemTime } from "@/utils/format";
import { useEffect, useState } from "react";
// 该组件展示文章的一些信息包括标签，最后更新时间等
export type PostFooterProps = {
  updateAt: string;
};
export function PostFooter({ updateAt }: PostFooterProps) {
  const [updateTime, setUpdateTime] = useState<string>("");
  useEffect(() => {
    if (!updateAt) {
      return;
    }
    setUpdateTime(formatPostItemTime(updateAt));
  }, [updateAt]);
  return (
    <div className={styles["post-footer-container"]}>
      <div className={styles["last-post-modify-time"]}>文章最后更新于: {updateTime}</div>
    </div>
  );
}
