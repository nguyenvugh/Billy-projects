import { getArticle, getArticleDetail } from "@cbi/services/article";
import { PostDetailProps } from "@cbi/services/article/article.interface";
import { useRouter } from "next/router";
import React from "react";
import ContentDetail from "src/news-detail/index";
function PostDetail({ hotnewArticle, detailArticle }: PostDetailProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  } else {
    return (
      <ContentDetail
        hotnewArticle={hotnewArticle}
        detailArticle={detailArticle}
      />
    );
  }
}

export const getServerSideProps = async ({
  query,
}: {
  query: { slug: string };
}) => {
  try {
    const { slug } = query;
    const hotnewArticle = (await getArticle({ limit: 4 })).data.results;
    const detailArticle = (await getArticleDetail(slug)).data;

    return {
      props: {
        hotnewArticle,
        detailArticle,
      },
    };
  } catch (e) {
    return { props: { hotnewArticle: [], detailArticle: {} } };
  }
};

export default PostDetail;
export interface NewsDetailI {
  news: {
    translates: Array<any>;
    category_obj: any;
    created_at: string;
    author: string;
  };
  relateds: Array<any>;
}
