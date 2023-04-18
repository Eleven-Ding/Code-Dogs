import { Input, Divider, Button, message } from "antd";
import { useEffect, useMemo, useState } from "react";
import { CommentList } from "./commentList/commentList";
import { CommontItemType, createComment } from "@/request/home";
import { getCommentsByPostId } from "@/request/home";
import { useCallback } from "react";
import styles from "./comment.module.scss";

const { TextArea } = Input;

type CommentProps = {
  post_id: number;
  user_id: string;
};

export function Comment({ post_id, user_id }: CommentProps) {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [commentList, setCommentList] = useState([] as CommontItemType[]);

  const handleTextAreaChange = useCallback(
    ({ target }: { target: HTMLTextAreaElement }) => {
      setContent(target.value);
    },
    []
  );
  const updateCommentList = useCallback(async (post_id: number) => {
    getCommentsByPostId(post_id).then((res) => {
      setCommentList(res.data);
    });
  }, []);

  const submitComment = useCallback(
    async (content: string, replyId: number, parentId: number) => {
      if (content.length === 0) {
        message.warning("评论不能为空");
        return;
      }
      if (parentId === -1) {
        setLoading(true);
      }
      try {
        const res = await createComment(post_id, parentId, content, replyId);
        const { message: resMessage } = res;
        message.success(resMessage);
        setContent("");
        updateCommentList(post_id);
      } catch (error) {
        message.error((error as any).response?.data.message);
      }
      if (parentId === -1) {
        setLoading(false);
      }
    },
    [post_id, updateCommentList]
  );

  useEffect(() => {
    updateCommentList(post_id);
  }, [post_id, updateCommentList]);

  return (
    <div className={styles["comment-container"]}>
      <Divider style={{ color: "rgb(124 118 118)", fontWeight: 500 }}>
        欢迎留言评论
      </Divider>
      <TextArea
        placeholder="支持markdown语法"
        className={styles["comment-input-field"]}
        value={content}
        onChange={handleTextAreaChange}
      />
      <p className={styles["submit-btn"]}>
        <Button
          onClick={() => {
            submitComment(content, -1, -1);
          }}
          type="primary"
          disabled={!content}
          loading={loading}
        >
          提交评论
        </Button>
      </p>
      <CommentList
        submitComment={submitComment}
        commentList={commentList}
        user_id={user_id}
      />
    </div>
  );
}
