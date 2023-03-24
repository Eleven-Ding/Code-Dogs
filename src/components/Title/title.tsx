import styles from "./title.module.scss";

export default function Title() {
  return (
    <div className={styles["title-container"]}>
      <h1 className={styles["title"]}>ElevenDing🌲</h1>
      <span className={styles["title-description"]}>
        热爱编程、努力成为一个合格的前端
      </span>
    </div>
  );
}
