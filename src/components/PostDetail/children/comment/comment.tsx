import { Input, Divider, Button } from "antd";
import styles from "./comment.module.scss";
import { CommentList } from "./commentList/commentList";
const { TextArea } = Input;
export function Comment() {
  return (
    <div className={styles["comment-container"]}>
      <Divider style={{ color: "rgb(124 118 118)", fontWeight: 500 }}>
        欢迎留言评论
      </Divider>
      <TextArea
        placeholder="支持markdown语法"
        className={styles["comment-input-field"]}
      />
      <p className={styles["submit-btn"]}>
        <Button type="primary">提交评论</Button>
      </p>
      {/* TODO: 这个组件是可以懒加载的 */}
      <CommentList />
    </div>
  );
}
