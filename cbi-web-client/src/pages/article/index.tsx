import { getAllCategory, getArticle } from "@cbi/services/article";
import { ArticleProps } from "@cbi/services/article/article.interface";
import React from "react";
import ArticleModule from "src/article";

export async function getServerSideProps() {
  try {
    const slideArticle = (await getArticle({ isFeature: 1 })).data.results;
    const hotnewArticle = (await getArticle({ limit: 4 })).data.results;

    const articleCate = (await getAllCategory()).data;
    const articleByCatePromise = articleCate.map(async (cate) => {
      return {
        ...cate,
        articles: (await getArticle({ idCategory: cate.id, limit: 5 })).data
          .results,
      };
    });
    const articleByCate = await Promise.all(articleByCatePromise);

    return {
      props: {
        slideArticle,
        hotnewArticle,
        articleByCate,
      },
    };
  } catch (e) {
    return {
      props: { slideArticle: [], hotnewArticle: [], articleByCate: {} },
    };
  }
}
function Category({
  articleByCate,
  hotnewArticle,
  slideArticle,
}: ArticleProps) {
  return (
    <ArticleModule
      articleByCate={articleByCate}
      hotnewArticle={hotnewArticle}
      slideArticle={slideArticle}
    />
  );
}
export default Category;
