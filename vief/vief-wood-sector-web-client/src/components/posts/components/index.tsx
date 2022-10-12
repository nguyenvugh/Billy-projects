import React from "react";
import { PostsType } from "../posts.interface";
import { useGetPosts } from "../hooks/useGetPosts";

export function Posts() {
  const { data } = useGetPosts();
  const posts = data?.data;
  return (
    <div>
      {posts?.map((post: PostsType) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}
