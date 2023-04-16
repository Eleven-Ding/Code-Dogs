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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
