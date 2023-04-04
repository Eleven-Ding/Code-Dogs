import type { AppProps } from "next/app";
import Layout from "@/common/Layout/layout";
import "../styles/normalize.css";
import "../assets/font/iconfont.css";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import "../styles/common.css";
import "../styles/github.css";
import "../styles/highlight.css";
import { Modal } from "antd";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Modal.success({
      title: "你好呀 ❤️",
      content: (
        <div>
          <p>最近在使用 Next 重构本博客，Bug 多多，努力完善和修复中</p>
          <p>前博客链接: <a href="http://pre.dingshiyi.top/home">DingShiYi ‘Blog</a></p>
          <p>有什么建议和 idea 可以直接联系我，一经采纳则双手呈上 2 元红包</p>
        </div>
      ),
    });
  }, []);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
