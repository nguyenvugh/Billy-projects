import { LIST_DATA_RESPONSE } from "@/src/common/constants/common.constant";
import { Article, Lang, ListResponse } from "@/src/common/interfaces/common.interface";
import { getListArticleService, getListCategoryService } from "@/src/common/services/common.services";
import { PolicyPage } from "@/src/components/policyComponents";
import { PolicyPageProps } from "@/src/components/policyComponents/interfaces";
import { ARTICLE_POLICY_SIZE, getParamSearchPolicy } from "@/src/components/section-policy/constant";
import { GetStaticProps } from "next";

function index({ articleData, categories, latestArticle }: PolicyPageProps) {
  return <PolicyPage articleData={articleData} categories={categories} latestArticle={latestArticle} />;
}

export const getStaticProps: GetStaticProps<PolicyPageProps> = async ({ locale }) => {
  const categories = await (await getListCategoryService(getParamSearchPolicy({ size: 4, lang: locale as Lang }))).data;
  let articleDataRes = new Promise<ListResponse<Article>>((rs) => {
    rs(LIST_DATA_RESPONSE);
  });
  if (categories.length) {
    articleDataRes = getListArticleService(
      getParamSearchPolicy({
        size: ARTICLE_POLICY_SIZE,
        lang: locale as Lang,
        slugCategory: categories[0].slug,
      })
    );
  }
  const latestArticleRes = getListArticleService(getParamSearchPolicy({ size: 3, lang: locale as Lang }));
  const data = await Promise.all([articleDataRes, latestArticleRes]);
  const articleData = data[0];
  const latestArticle = data[1].data;

  return {
    props: { articleData, categories, latestArticle },
    revalidate: 10,
  };
};

export default index;
