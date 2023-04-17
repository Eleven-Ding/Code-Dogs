import { CommontItemType } from "@/request/home";
import styles from "./commentChildren.module.scss";
import { userInfo } from "os";
import { CommentItem } from "../commentItem/commentItem";
import { RootState } from "@/store/store";
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
export type CommentChildrenProps = {
  childrenComments: CommontItemType[];
  parentComment: CommontItemType;
  submitComment: (content: string, replyId: string, parentId: number) => void;
  author: string;
};

export function CommentChildren({
  childrenComments,
  parentComment,
  submitComment,
  author,
}: CommentChildrenProps) {
  const userInfo = useSelector((state: RootState) => state.header.userInfo);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [currentReplyComment, updateCurrentReplyComment] =
    useState<CommontItemType | null>(null);

  const handleLoadMoreChildren = useCallback(() => {
    setLoadMoreLoading(!loadMoreLoading);
    // 根据 parentId 来获取全部的子评论，然后再 merge 到原来的评论列表上
    const { commentId } = parentComment;
  }, [loadMoreLoading, parentComment]);
  return (
    <div className={styles["children-comment-list"]}>
      {childrenComments!.map((child) => {
        // 计算需要展示的文字，传递给子组件
        const replyOnWhichCommentText = childrenComments.find(
          (comment) => child.comment_on_user_id === comment.user.user_id
        )?.content;
        return (
          <CommentItem
            key={child.commentId}
            comment={child}
            author={author}
            userInfo={userInfo}
            currentReplyComment={currentReplyComment}
            updateCurrentReplyComment={updateCurrentReplyComment}
            submitComment={submitComment}
            replyOnWhichCommentText={replyOnWhichCommentText}
          />
        );
      })}
      {childrenComments && (
        <div
          className={styles["load-more-children-comments"]}
          onClick={handleLoadMoreChildren}
        >
          <p className={styles["load-more-children-comments-text"]}>
            {loadMoreLoading && "加载中 . . . "}
            {!loadMoreLoading &&
              parentComment.childrenCommentCount! > childrenComments.length &&
              `查看剩余 ${
                parentComment.childrenCommentCount! - childrenComments.length
              } 条回复 ▼`}
          </p>
        </div>
      )}
    </div>
  );
}
