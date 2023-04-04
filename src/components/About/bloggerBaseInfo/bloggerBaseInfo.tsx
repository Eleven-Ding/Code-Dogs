import styles from "./bloggerBaseInfo.module.scss";
import Image from "next/image";
export function BloggerBaseInfo() {
  return (
    <div className={styles["blogger-base-info-container"]}>
      <div className={styles["blogger-back-image"]} />
    </div>
  );
}
