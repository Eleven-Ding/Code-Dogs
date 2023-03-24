import Header from "@/common/Header/header";
import Footer from "@/common/Footer/footer";
import { PropsWithChildren } from "react";
import styles from "./layout.module.scss";
import CommonHead from "@/components/Head/head";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <CommonHead></CommonHead>
      <Header />
      <div className={styles["layout-container"]}>
        <div className={styles["layout-left-content"]}>{children}</div>
        <div className={styles["layout-right-panel"]}>Right Bar</div>
      </div>
      <Footer />
    </>
  );
}
