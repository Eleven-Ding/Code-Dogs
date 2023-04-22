import { CommontItemType } from "@/request/home";
import { User } from "@/types/auth";
import React from "react";
import { formatPostItemTime } from "@/utils/format";
import styles from "./commentItem.module.scss";
import { Button, Input } from "antd";
import { useCallback, useState } from "react";
import { LazyImage } from "@/common/LazyImage/lazyImage";

export type CommontItemProps = {
  comment: CommontItemType;
  userInfo: User | null;
  author: string | null;
  currentReplyComment: CommontItemType | null;
  updateCurrentReplyComment: (comment: CommontItemType | null) => void;
  submitComment: (content: string, replyId: number, parentId: number) => void;
  replyOnWhichCommentText?: string;
};

const { TextArea } = Input;

function _CommentItem({
  comment,
  userInfo,
  author,
  currentReplyComment,
  updateCurrentReplyComment,
  submitComment,
  replyOnWhichCommentText,
}: CommontItemProps) {
  const [loading, updateLoading] = useState(false);
  const { user, content, createdAt, position } = comment;
  const { username, avatar_url } = user || ({} as User);
  const [replyContent, setReplyContent] = useState("");

  const hanldeCommentItemSubmit = useCallback(async () => {
    if (!currentReplyComment) {
      return;
    }
    updateLoading(true);
    const parentId =
      currentReplyComment.parentId !== -1
        ? comment.parentId
        : comment.commentId;
    await submitComment(replyContent, currentReplyComment.commentId, parentId);

    updateLoading(false);
    setReplyContent("");
    updateCurrentReplyComment(null);
  }, [
    currentReplyComment,
    comment,
    submitComment,
    replyContent,
    updateCurrentReplyComment,
  ]);

  const handleCommentTextAreaChange = useCallback(
    ({ target }: { target: HTMLTextAreaElement }) => {
      setReplyContent(target.value);
    },
    []
  );
  return (
    <div className={styles["comment-item-container"]}>
      <div className={styles["comment-item-image-container"]}>
        <LazyImage
          src={avatar_url}
          alt="ElevenDing 前端技术博客"
          lazy={true}
          style={{
            width: "30px",
            heigth: "30px",
          }}
          loadingSize="small"
        />
      </div>
      <div className={styles["comment-right-info"]}>
        <div className={styles["comment-top-info"]}>
          <span className={styles["username"]}>
            {username}
            {user.user_id === author && (
              <span className={styles["post-author"]}>作者</span>
            )}
          </span>
          <span>
            <span className={styles["createTime"]}>
              {formatPostItemTime(createdAt)}
            </span>
          </span>
          <span className={styles["position"]}>{position}</span>
        </div>

        <div className={styles["content"]}>{content}</div>
        {replyOnWhichCommentText && (
          <div className={styles["reply-which-comment-text"]}>
            {`"${replyOnWhichCommentText}"`}
          </div>
        )}

        <div className={styles["comment-operations"]}>
          <span
            onClick={() => {
              updateCurrentReplyComment(comment);
            }}
          >
            <i className="iconfont icon-comment"></i>回复
          </span>
          {userInfo && userInfo.user_id == user.user_id && (
            <span>
              <i className="iconfont icon-delete"></i>删除
            </span>
          )}
          <span>
            <i className="iconfont icon-dianzan"></i>
          </span>
        </div>
        {currentReplyComment?.commentId === comment.commentId && (
          <div className={styles["comment-item-input"]}>
            <TextArea
              placeholder={`回复: ${user.username}...`}
              style={{ height: "80px", marginBottom: "10px" }}
              onChange={handleCommentTextAreaChange}
            />
            <p className={styles["comment-item-submit-btn"]}>
              <Button
                disabled={!replyContent}
                loading={loading}
                type="primary"
                onClick={hanldeCommentItemSubmit}
              >
                发布
              </Button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export const CommentItem = React.memo(_CommentItem);
