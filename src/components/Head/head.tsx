import Head from "next/head";

export type CommonHead = {
  content: string;
  title: string;
};

const commonContent =
  "ElevenDing 前端技术博客, Next、Node、Next.js、NextJs、后端、自动部署、文件上传、服务端、面试经验、JavaScript、CSS、React、Vue";
  
export default function CommonHead({ content, title }: CommonHead) {
  return (
    <Head>
      <title>{title + " ElevenDing 前端技术博客"}</title>
      <meta name="description" content={`${content}: ${commonContent}`} />
      <meta name="keywords" content={`${content}: ${commonContent}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="icon"
        href="https://blog-1303885568.cos.ap-chengdu.myqcloud.com/icon.jpeg"
      />
    </Head>
  );
}
