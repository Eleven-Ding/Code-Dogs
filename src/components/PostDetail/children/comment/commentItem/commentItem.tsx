import { CommontItemType } from "@/request/home";
import { User } from "@/types/auth";
import { formatPostItemTime } from "@/utils/format";
import styles from "./commentItem.module.scss";
import Image from "next/image";
import { Button, Input } from "antd";
import { useCallback, useState } from "react";

export type CommontItemProps = {
  comment: CommontItemType;
  userInfo: User | null;
  author: string | null;
  currentReplyComment: CommontItemType | null;
  updateCurrentReplyComment: (comment: CommontItemType | null) => void;
  submitComment: (content: string, replyId: string, parentId: number) => void;
};

const { TextArea } = Input;

export function CommentItem({
  comment,
  userInfo,
  author,
  currentReplyComment,
  updateCurrentReplyComment,
  submitComment,
}: CommontItemProps) {
  const [loading, updateLoading] = useState(false);
  const { user, content, createdAt, position } = comment;
  const { username, avatar_url } = user || ({} as User);
  const [replyContent, setReplyContent] = useState("");

  const hanldeCommentItemSubmit = useCallback(() => {
    if (!currentReplyComment) {
      return;
    }

    // 如果是回复第一级的评论，那么 parentId 就是第一级的commentId
    // 如果回复是二级评论里的评论，那么 parentId 就是目标评论的 parentId
    updateLoading(true);
    const parentId =
      currentReplyComment.parentId !== -1
        ? comment.parentId
        : comment.commentId;
    submitComment(replyContent, currentReplyComment?.user.user_id, parentId);

    updateLoading(false);
    setReplyContent("");
    updateCurrentReplyComment(null);
  }, [currentReplyComment, replyContent, comment, submitComment]);

  const handleCommentTextAreaChange = useCallback(
    ({ target }: { target: HTMLTextAreaElement }) => {
      setReplyContent(target.value);
    },
    []
  );
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

        <p>
          {comment.comment_on_user && (
            <span className={styles["reply-for"]}>
              回复 {comment.comment_on_user.username}:
            </span>
          )}
          {content}
        </p>
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
              style={{ height: "80px" }}
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
