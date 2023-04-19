import { CommontItemType } from "@/request/home";
import styles from "./commentChildren.module.scss";
import { userInfo } from "os";
import { CommentItem } from "../commentItem/commentItem";
import { RootState } from "@/store/store";
import { useState, useCallback, Dispatch } from "react";
import { useSelector } from "react-redux";
import { getCommentsByParentId } from "@/request/home";
import { useDispatch } from "react-redux";
import { mergeCommentListByChildrenId } from "@/store/comment";
import { AnyAction, PayloadAction } from "@reduxjs/toolkit";

export type CommentChildrenProps = {
  childrenComments: CommontItemType[];
  parentComment: CommontItemType;
  submitComment: (content: string, replyId: number, parentId: number) => void;
  author: string;
};

// 根据 parentId 获取全部子评论
export async function getChildrenCommentsByParentId(
  parentId: number,
  dispatch: Dispatch<AnyAction>
) {
  const result = await getCommentsByParentId(parentId);
  dispatch(
    mergeCommentListByChildrenId({
      childrenId: parentId,
      children: result.data,
    })
  );
}

export function CommentChildren({
  childrenComments,
  parentComment,
  submitComment,
  author,
}: CommentChildrenProps) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.header.userInfo);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [currentReplyComment, updateCurrentReplyComment] =
    useState<CommontItemType | null>(null);

  const handleLoadMoreChildren = useCallback(async () => {
    setLoadMoreLoading(true);
    await getChildrenCommentsByParentId(parentComment.commentId, dispatch);
    setLoadMoreLoading(false);
  }, [dispatch, parentComment.commentId]);
  return (
    <div className={styles["children-comment-list"]}>
      {childrenComments!.map((child) => {
        // 计算需要展示的文字，传递给子组件
        const replyOnWhichCommentText = childrenComments.find(
          (comment) => child.comment_on_id === comment.commentId
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
