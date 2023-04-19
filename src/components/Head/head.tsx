import Head from "next/head";
import { routes } from "@/config/router";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function CommonHead() {
  const [title, setTitle] = useState("");
  const currentPage = useSelector(
    (state: RootState) => state.header.currentTab
  );

  useEffect(() => {
    const text = routes.find((route) => route.link === currentPage)?.text ?? "";
    setTitle(text);
  }, [currentPage]);

  useEffect(() => {
    function listenVisibilitychange() {
      const isVisible = document.visibilityState === "visible";
      if (isVisible) {
        const text =
          routes.find((route) => route.link === location.pathname)?.text ??
          "前端技术博客";
        setTitle(text);
      } else {
        setTitle("别走，再看我一眼 -");
      }
    }
    document.addEventListener("visibilitychange", listenVisibilitychange);
    return () => {
      document.removeEventListener("visibilitychange", listenVisibilitychange);
    };
  }, []);

  return (
    <Head>
      <title>{title + " ElevenDing 前端技术博客"}</title>
      <meta
        name="description"
        content="ElevenDing 前端技术博客, Next、Node、Next.js、NextJs、后端、自动部署、文件上传、服务端、面试经验、JavaScript、CSS、React、Vue"
      />
      <meta
        name="keywords"
        content="ElevenDing 前端技术博客, Next、Node、Next.js、NextJs、后端、自动部署、文件上传、服务端、面试经验、JavaScript、CSS、React、Vue"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="icon"
        href="https://blog-1303885568.cos.ap-chengdu.myqcloud.com/icon.jpeg"
      />
    </Head>
  );
}
