import { CommentItem } from "../commentItem/commentItem";
import { CommontItemType } from "@/request/home";
import styles from "./commentList.module.scss";
export type CommentListProps = {
  commentList: CommontItemType[];
  user_id: string;
};
export function CommentList({ commentList, user_id }: CommentListProps) {
  return (
    <div className={styles["comment-list-container"]}>
      <h3 className={styles["comment-list-header"]}>评论列表</h3>
      {!commentList.length ? (
        <p className={styles["comment-list-no-content"]}>暂无评论 ...</p>
      ) : (
        commentList.map((item) => (
          <CommentItem key={item.commentId} comment={item} user_id={user_id} />
        ))
      )}
    </div>
  );
}
