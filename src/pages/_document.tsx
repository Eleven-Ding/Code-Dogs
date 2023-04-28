import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1163321291228195"
          crossOrigin="anonymous"
        ></Script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <script>0</script>
      </body>
    </Html>
  );
}
