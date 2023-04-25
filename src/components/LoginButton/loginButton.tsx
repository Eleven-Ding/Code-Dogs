import styles from "./loginButton.module.scss";
import { changeShowLoginPanel, changeUserInfo } from "@/store/head";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { LazyImage } from "@/common/LazyImage/lazyImage";
import { useCallback, useEffect, useMemo } from "react";
import { Button, Popover, message } from "antd";
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
  const handleLoginOut = useCallback(() => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    dispatch(changeUserInfo(null));
  }, [dispatch]);

  const renderLoginOut = useMemo(() => {
    return (
      <Button onClick={handleLoginOut} danger>
        退出登录
      </Button>
    );
  }, [handleLoginOut]);
  return (
    <div className={styles["login-button-container"]}>
      {userInfo ? (
        <Popover content={renderLoginOut} trigger="click">
          <LazyImage
            src={userInfo!.avatar_url}
            alt="ElevenDing 前端技术博客"
            lazy={true}
            loadingSize="small"
          ></LazyImage>
        </Popover>
      ) : (
        <span className={styles["login"]} onClick={showLoginPanel}>
          登录
        </span>
      )}
    </div>
  );
}
