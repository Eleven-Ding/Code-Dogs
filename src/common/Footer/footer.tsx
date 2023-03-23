import styles from "./footer.module.scss";
export default function Footer() {
  return (
    <div className={styles["footer-container"]}>
      <p>本系统由 Next + Express 联合驱动</p>
      <p>
        <span className={styles["storage"]}>COS对象存储</span>蜀ICP备20019999-2{" "}
        <span className={styles["hosting"]}>托管于阿里云</span>
      </p>
      <p>本站已苟且偷生 882天14时42分41秒</p>
      <p>DingShiYi‘s Blog</p>
    </div>
  );
}
