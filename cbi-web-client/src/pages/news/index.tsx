import { LIST_RESPONSE_DEFAULT } from "@cbi/constants/index";
import { getArticle } from "@cbi/services/article";
import { CategoryPageProps } from "@cbi/services/article/article.interface";
import React from "react";
import NewsModule from "src/news";
function Category(props: CategoryPageProps) {
  return <NewsModule {...props} />;
}
export const getServerSideProps = async ({ query }: any) => {
  try {
    const { categoryId: idCategory } = query;
    const hotnewArticle = (await getArticle({ limit: 4 })).data.results;
    let articlesByCateId = LIST_RESPONSE_DEFAULT;
    if (idCategory) {
      articlesByCateId = (await getArticle({ idCategory, limit: 6 })).data;
    }
    return {
      props: {
        hotnewArticle,
        articlesByCateId,
      },
    };
  } catch (e) {
    return {
      props: {
        hotnewArticle: [],
        articlesByCateId: LIST_RESPONSE_DEFAULT,
      },
    };
  }
};
export default Category;
