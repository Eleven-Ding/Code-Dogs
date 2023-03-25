import UserInfo from "@/components/UserInfo/userInfo";
import styles from "./rightPanel.module.scss";
export default function RightPanel() {
  return (
    <div className={styles["right-panle-container"]}>
      <UserInfo />
    </div>
  );
}
