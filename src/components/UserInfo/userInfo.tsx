import styles from "./userInfo.module.scss";
import Image from "next/image";
import Avatar from "../../assets/images/avatar.jpeg";
export default function UserInfo() {
  return (
    <div className={styles["user-info-container"]}>
      <Image alt="" width={100} height={100} src={Avatar}></Image>
      <h1 className={styles["self-user-name"]}>ElevenDing</h1>
      <p>四川 - 成都</p>
      <p>西华大学</p>
      <p>热爱编程、努力成为一个合格的前端</p>
      <p>前端: Next + Typescript</p>
      <p>后端: Express + Mysql + Typescript</p>
    </div>
  );
}
