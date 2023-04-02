import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const { type, code } = router.query;
    if (!window.opener) {
      router.push("/");
    }
    if (!type || !code) {
      return;
    }
    window.opener?.postMessage(
      {
        type,
        data: code,
      },
      "*"
    );
    window.close();
  }, [router]);
  return <>登录</>;
}
