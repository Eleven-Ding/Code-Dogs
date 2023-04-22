import { BloggerBaseInfo } from "@/components/About/bloggerBaseInfo/bloggerBaseInfo";
import { Clock } from "@/components/About/clock/clock";
import { GetServerSideProps } from "next";
import { AboutMeMd } from "@/request/about";
import { getAboutMe } from "@/request/about";
import { marked } from "marked";
import CommonHead from "@/components/Head/head";
import { LazyImage } from "@/common/LazyImage/lazyImage";

export default function About(props: { data: AboutMeMd }) {
  return (
    <>
      <CommonHead title="Next" content={props.data.slice(0, 100)} />
      <BloggerBaseInfo></BloggerBaseInfo>

      <Clock></Clock>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: marked(props.data) }}
      ></div>
      <LazyImage
        src={
          "https://blog-1303885568.cos.ap-chengdu.myqcloud.com/img/DSY-1638964112130.JPEG2000"
        }
        alt="233"
        lazy={true}
      />
    </>
  );
}

export async function getServerSideProps(context: GetServerSideProps) {
  let result = "> 不好意思，服务器开小差了。";
  try {
    const { data } = await getAboutMe();
    result = data;
  } catch (error) {
    // TODO: 提示
  }
  return {
    props: {
      data: result,
    },
  };
}
