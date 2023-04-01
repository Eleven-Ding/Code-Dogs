/* eslint-disable @next/next/no-img-element */
import styles from "./login.module.scss";
import { LoginTypeItem, LoginType } from "@/types/header";
import { useCallback, useEffect, useMemo, useState } from "react";
import { User } from "@/types/auth";
import type { MenuProps } from "antd";
import { Dropdown, Space, message } from "antd";
import { openLoginWindow } from "@/utils/openLoginWindow";
import { login } from "@/request/auth";
import { closeGlobalLoading, startGlobalLoading } from "@/utils/createLoading";
import { LoginTypeList } from "@/const";

export const messageLoadingKey = "OAuth_Login";

export default function Login() {
  const [messageApi, ContextHolder] = message.useMessage();
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const handleLoginMenuItemClick = useCallback(
    ({ key }: { key: string }) => {
      if (key === LoginType.LogOut) {
        setUserInfo(null);
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        messageApi.success({
          content: `成功退出登录`,
          duration: 2,
        });
        return;
      }
      const { link } = LoginTypeList.find((item) => item.type === key)!;
      openLoginWindow(link, "loginWindow");
    },
    [messageApi]
  );

  useEffect(() => {
    async function handlePostMessage({ data }: any) {
      const { type, data: payload } = data;
      if (!type || !payload) {
        return;
      }
      try {
        messageApi.info({
          content: "登陆中，请稍后",
          duration: 1,
        });
        startGlobalLoading();
        const { data, code } = await login(payload);
        if (code === -1) {
          throw new Error("登录失败");
        }

        const { token, userInfo } = data;
        messageApi.success({
          content: `你好，${userInfo.username}，欢迎您的到来`,
          duration: 2,
        });
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
  }, [messageApi]);

  // 重新进入浏览器保持登录
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const token = localStorage.getItem("token");
    if (token && userInfo) {
      setUserInfo(JSON.parse(userInfo));
    }
  }, []);

  const items: MenuProps["items"] = useMemo(() => {
    let menuItems = [];
    if (!userInfo) {
      menuItems = LoginTypeList.map(({ type, text, icon }) => {
        return {
          key: type,
          label: <span>{text}</span>,
          icon: <span className={icon} style={{ fontSize: "20px" }}></span>,
        };
      });
    } else {
      menuItems = [
        {
          key: LoginType.LogOut,
          label: <span>{userInfo.username} 退出登录</span>,
        },
      ];
    }
    return menuItems;
  }, [userInfo]);

  return (
    <div className={styles["login-container"]}>
      {ContextHolder}
      <Dropdown
        menu={{ items, onClick: handleLoginMenuItemClick }}
        arrow
        placement="bottomLeft"
      >
        {userInfo ? (
          <Space className={styles["login-content"]}>
            <img src={userInfo.avatar_url} alt="ElevenDing Login" />
          </Space>
        ) : (
          <Space className={styles["login-content"]}>
            登录<i className="iconfont icon-drop-down"></i>
          </Space>
        )}
      </Dropdown>
    </div>
  );
}
