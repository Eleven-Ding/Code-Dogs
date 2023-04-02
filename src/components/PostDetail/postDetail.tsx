import { PostDetailType } from "@/request/home";
import Image from "next/image";
import { marked } from "marked";

export function PostDetail({
  post_title,
  post_url,
  post_description,
  post_content,
}: PostDetailType) {
  return (
    <div className="markdown-body">
      <h1>{post_title}</h1>
      {/* 图片描述 */}
      {post_url && (
        <div style={{ width: "100%", position: "relative", height: "300px" }}>
          <Image
            src={post_url}
            alt="ElevenDingImage"
            fill={true}
            loading={"lazy"}
            style={{ objectFit: "cover" }}
            quality={50}
          ></Image>
        </div>
      )}

      <span>{post_description}</span>
      <div
        dangerouslySetInnerHTML={{
          __html: marked(post_content || ""),
        }}
      ></div>
    </div>
  );
}
