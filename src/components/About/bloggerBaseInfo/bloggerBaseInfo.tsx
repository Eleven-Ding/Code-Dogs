import styles from "./bloggerBaseInfo.module.scss";
import Image from "next/image";
export function BloggerBaseInfo() {
  return (
    <div className={styles["blogger-base-info-container"]}>
      <div className={styles["blogger-back-image"]} />
      <div className={styles["blogger-basic-info"]}>
        <Image
          src="https://blog-1303885568.cos.ap-chengdu.myqcloud.com/useImg/avat.jpg"
          width={100}
          height={100}
          alt="ElevenDing 前端技术博客"
        ></Image>
        <div className={styles["blogger-name-container"]}>
          <p>ElevenDing</p>
          <p>四川-成都 | 西华大学</p>
          <p>Hi，我叫丁时一，热爱编程，正在努力成为一个合格的前端工程师！</p>
        </div>
      </div>
    </div>
  );
}
