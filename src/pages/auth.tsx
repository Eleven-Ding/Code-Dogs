import { useEffect } from "react";
import { proxyRequest } from "@/request";
export default function Home() {
  useEffect(() => {
    const code = window.location.search.split("=")[1];
    console.log(code);

    // 拿着这个 Code 去打接口，服务端去拿 access_Token 和 用户信息
  }, []);
  return (
    <>
      <main>
        <h1>Auth</h1>
        <h1>登陆中....</h1>
      </main>
    </>
  );
}
