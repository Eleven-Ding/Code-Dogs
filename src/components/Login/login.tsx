import styles from "./login.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import { User } from "@/types/auth";
import { message } from "antd";
import { openLoginWindow } from "@/utils/openLoginWindow";
import { login } from "@/request/auth";
import { closeGlobalLoading, startGlobalLoading } from "@/utils/createLoading";
import { LoginTypeList } from "@/const";
import { useDispatch } from "react-redux";
import { changeUserInfo } from "@/store/head";
import { changeShowLoginPanel } from "@/store/head";

export const messageLoadingKey = "OAuth_Login";

export default function Login() {
  const [messageApi, ContextHolder] = message.useMessage();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const dispatch = useDispatch();

  const handleLoginMenuItemClick = useCallback(({ key }: { key: string }) => {
    const { link } = LoginTypeList.find((item) => item.type === key)!;
    openLoginWindow(link, "loginWindow");
  }, []);

  useEffect(() => {
    async function handlePostMessage({ data }: any) {
      const { type, data: payload } = data;
      if (!type || !payload) {
        return;
      }
      dispatch(changeShowLoginPanel(false));
      try {
        messageApi.info({
          content: "登陆中，请稍后",
          duration: 1,
        });
        startGlobalLoading();
        const { data, code } = await login(payload, type);
        if (code === -1) {
          throw new Error("登录失败");
        }

        const { token, userInfo } = data;
        messageApi.success({
          content: `你好，${userInfo.username}，欢迎您的到来`,
          duration: 2,
        });
        dispatch(changeUserInfo(userInfo));
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setUserInfo(userInfo);
      } catch (error) {
        messageApi.warning({
          content: (error as Error).message,
          duration: 2,
        });
      } finally {
        closeGlobalLoading();
      }
    }
    window.addEventListener("message", handlePostMessage, false);
    return () => {
      window.removeEventListener("message", handlePostMessage, false);
    };
  }, [dispatch, messageApi]);

  // 重新进入浏览器保持登录
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const token = localStorage.getItem("token");
    if (token && userInfo) {
      setUserInfo(JSON.parse(userInfo));
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      dispatch(changeUserInfo(userInfo));
    }
  }, [userInfo, dispatch]);

  const handleClose = () => {
    dispatch(changeShowLoginPanel(false));
  };
  return (
    <div className={styles["login-container"]}>
      {ContextHolder}
      <p className={styles["login-title"]}>
        <span>欢迎使用第三方登录</span>
        <span
          onClick={handleClose}
          className="iconfont icon-delete-filling"
        ></span>
      </p>
      <div className={styles["login-item-list"]}>
        {LoginTypeList.map((item) => {
          return (
            <div
              key={item.type}
              className={styles["login-opt-item"]}
              onClick={() => {
                handleLoginMenuItemClick({ key: item.type });
              }}
            >
              <span className={item.icon} style={{ color: item.color }}></span>
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
