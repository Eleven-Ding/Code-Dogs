import { PostListResponse } from "@/pages";
import { PostItem } from "./postItem";

export function PostsList({ rows = [] }: PostListResponse) {
  return (
    <>
      {rows.map((post) => {
        return <PostItem key={post.post_id} {...post} />;
      })}
    </>
  );
}
