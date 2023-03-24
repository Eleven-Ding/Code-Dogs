import type { AppProps } from "next/app";
import Layout from "@/common/Layout/layout";
import "../styles/normalize.css";
import "../assets/font/iconfont.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
