import Header from "@/common/Header/header";
import Footer from "@/common/Footer/footer";
import { PropsWithChildren, useEffect } from "react";
import styles from "./layout.module.scss";
import RightPanel from "../RightPanel/rightPanel";
import { initBackGroudColorTick } from "../../utils/backgroud";

export default function Layout({ children }: PropsWithChildren) {
  useEffect(() => {
    initBackGroudColorTick();
  }, []);
  return (
    <>
      <Header />
      <div className={styles["layout-container"]}>
        <div className={styles["layout-left-content"]}>{children}</div>
        <div className={styles["layout-right-panel"]}>
          <RightPanel />
        </div>
      </div>
      <Footer />
    </>
  );
}
