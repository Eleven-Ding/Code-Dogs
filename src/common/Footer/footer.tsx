import { useEffect, useState } from "react";
import styles from "./footer.module.scss";
import { getCurrentFormatTime } from "@/utils/getCurrentTime";

export default function Footer() {
  const [passTime, updatePassTime] = useState("");
  useEffect(() => {
    const timer = setInterval(() => {
      updatePassTime(getCurrentFormatTime());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className={styles["footer-container"]}>
      <p>本系统由 Next + Express 联合驱动</p>
      <p>
        <span className={styles["storage"]}>COS对象存储</span>蜀ICP备20019999-2{" "}
        <span className={styles["hosting"]}>托管于阿里云</span>
      </p>
      <p>本站已苟且偷生 {passTime}</p>
      <p>
        DingShiYi‘s Blog{" "}
        <span className={styles["foot-dancing"]}>ｸﾞｯ!(๑•̀ㅂ•́)و✧</span>
      </p>
    </div>
  );
}
