import { CommentItem } from "../commentItem/commentItem";
import { CommontItemType } from "@/request/home";
import styles from "./commentList.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
export type CommentListProps = {
  commentList: CommontItemType[];
  user_id: string;
};
export function CommentList({ commentList, user_id }: CommentListProps) {
  const userInfo = useSelector((state: RootState) => state.header.userInfo);

  return (
    <div className={styles["comment-list-container"]}>
      <h3 className={styles["comment-list-header"]}>评论列表</h3>
      {!commentList.length ? (
        <p className={styles["comment-list-no-content"]}>暂无评论 ...</p>
      ) : (
        commentList.map((item) => (
          <CommentItem
            key={item.commentId}
            comment={item}
            author={user_id}
            userInfo={userInfo}
          />
        ))
      )}
    </div>
  );
}
