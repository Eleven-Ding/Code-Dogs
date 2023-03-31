import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search).values();
    const [type, code] = [...params];
    if (!window.opener) {
      router.push("/");
    }
    window.opener?.postMessage(
      {
        type,
        data: code,
      },
      "*"
    );
    window.close();
  }, []);
  return <>登录</>;
}
