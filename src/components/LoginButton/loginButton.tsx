import styles from "./loginButton.module.scss";
import { changeShowLoginPanel, changeUserInfo } from "@/store/head";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { LazyImage } from "@/common/LazyImage/lazyImage";
import { useEffect } from "react";
export function LoginButton() {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (!userInfo) {
        return;
      }
      dispatch(changeUserInfo(JSON.parse(userInfo)));
    } catch (error) {}
  });
  const userInfo = useSelector(
    (state: RootState) => state.header.userInfo,
    shallowEqual
  );

  const showLoginPanel = () => {
    dispatch(changeShowLoginPanel(true));
  };
  return (
    <div className={styles["login-button-container"]}>
      {userInfo ? (
        <LazyImage
          src={userInfo!.avatar_url}
          alt="ElevenDing 前端技术博客"
          lazy={true}
          loadingSize="small"
        ></LazyImage>
      ) : (
        <span className={styles['login']} onClick={showLoginPanel}>登录</span>
      )}
    </div>
  );
}
