import { Posts } from "@/src/components/posts/components/index";

import React from "react";

function PostsPage() {
  return <Posts />;
}
// export const getStaticProps = async () => {
//   const res = await fetch('https://.../posts')
//   const posts = await res.json()

//   return {
//     props: {
//       posts,
//     },
//   };
// };
export default PostsPage;
