import { useEffect, useState } from "react";
import { formatPostItemTime } from "@/utils/format";
import styles from "./basicInfo.module.scss";
export type PostItemBasicInfo = {
  createdAt: string;
  view_count: number;
  style?: Record<string, string>;
};
export function PostItemBasicInfo({
  createdAt,
  view_count,
  style,
}: PostItemBasicInfo) {
  const [createTime, updateCreateTime] = useState<string>(
    "1999/10/30 12:00:00"
  );
  useEffect(() => {
    if (!createdAt) {
      return;
    }
    updateCreateTime(formatPostItemTime(createdAt));
  }, [createdAt]);
  return (
    <div className={styles["post-basic-info"]} style={style}>
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
  );
}
