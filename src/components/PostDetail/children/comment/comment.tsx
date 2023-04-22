import { Input, Divider, Button, message } from "antd";
import { useEffect, useState } from "react";
import { CommentList } from "./commentList/commentList";
import { createComment } from "@/request/home";
import { getCommentsByPostId } from "@/request/home";
import { useCallback } from "react";
import {
  changeCommentList,
  addParentComment,
  addChildrenComment,
} from "@/store/comment";
import styles from "./comment.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getChildrenCommentsByParentId } from "./commentChildren/commentChildren";
import { assembleComment } from "@/utils";

const { TextArea } = Input;

export enum CommentType {
  Root = 0,
  Child = 1,
}

type CommentProps = {
  post_id: number;
  user_id: string;
};

export function Comment({ post_id, user_id }: CommentProps) {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const commentList = useSelector(
    (state: RootState) => state.comment.commentList
  );

  const handleTextAreaChange = useCallback(
    ({ target }: { target: HTMLTextAreaElement }) => {
      setContent(target.value);
    },
    []
  );

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
        const { message: resMessage, data } = res;
        // 根据新数据更新缓存
        if (parentId === -1) {
          dispatch(addParentComment(assembleComment(data)));
        } else {
          dispatch(addChildrenComment(assembleComment(data)));
        }
        message.success(resMessage);
        setContent("");
      } catch (error) {
        message.error((error as any).response?.data.message);
      }
      setLoading(false);
    },
    [dispatch, post_id]
  );

  useEffect(() => {
    getCommentsByPostId(post_id).then((res) => {
      dispatch(changeCommentList(res.data));
    });
  }, [dispatch, post_id]);

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
