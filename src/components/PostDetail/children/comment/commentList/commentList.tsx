import { CommentItem } from "../commentItem/commentItem";
import { useState } from "react";
import { CommontItemType } from "@/request/home";
import styles from "./commentList.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
export type CommentListProps = {
  commentList: CommontItemType[];
  user_id: string;
  submitComment: (content: string, replyId: string, parentId: number) => void;
};
export function CommentList({
  commentList,
  user_id,
  submitComment,
}: CommentListProps) {
  const userInfo = useSelector((state: RootState) => state.header.userInfo);
  const [currentReplyComment, updateCurrentReplyComment] =
    useState<CommontItemType | null>(null);

  return (
    <div className={styles["comment-list-container"]}>
      <h3 className={styles["comment-list-header"]}>评论列表</h3>
      {!commentList.length ? (
        <p className={styles["comment-list-no-content"]}>暂无评论 ...</p>
      ) : (
        commentList.map((item) => (
          <>
            <CommentItem
              key={item.commentId}
              comment={item}
              author={user_id}
              userInfo={userInfo}
              currentReplyComment={currentReplyComment}
              updateCurrentReplyComment={updateCurrentReplyComment}
              submitComment={submitComment}
            />
            <div className={styles["children-comment-list"]}>
              {item.children &&
                item.children.map((child) => {
                  return (
                    <CommentItem
                      key={child.commentId}
                      comment={child}
                      author={user_id}
                      userInfo={userInfo}
                      currentReplyComment={currentReplyComment}
                      updateCurrentReplyComment={updateCurrentReplyComment}
                      submitComment={submitComment}
                    />
                  );
                })}
            </div>
          </>
        ))
      )}
    </div>
  );
}
