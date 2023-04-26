import styles from "./header.module.scss";
import { routes } from "@/config/router";
import Menu from "@/components/RouteMenu/menu";
import Title from "@/components/Title/title";
import { LoginButton } from "@/components/LoginButton/loginButton";

export default function Header() {
  return (
    <div className={styles["header-container"]}>
      <div className={styles["header-content"]}>
        <div className={styles["header-content-left"]}>
          <Title />
        </div>
        <div className={styles["header-content-right"]}>
          <Menu routes={routes} />
          <LoginButton/>
        </div>
      </div>
    </div>
  );
}
