import { LIST_DATA_RESPONSE } from "@/src/common/constants/common.constant";
import { Article, Category, Lang, ListResponse } from "@/src/common/interfaces/common.interface";
import { getListArticleService, getListCategoryService } from "@/src/common/services/common.services";
import { EnterpriseStory } from "@/src/components/enterprise-story";
import { ARTICLE_ENTERPRISE_SIZE, getParamSearchEnterprise } from "@/src/components/enterprise-story/constants";
import { GetStaticProps } from "next";

export type EnterprisePageProps = {
  categories: Category[];
  articleData: ListResponse<Article>;
};

function index({ articleData, categories }: EnterprisePageProps) {
  return <EnterpriseStory articleData={articleData} categories={categories} />;
}

export const getStaticProps: GetStaticProps<EnterprisePageProps> = async ({ locale }) => {
  const categories = await (
    await getListCategoryService(getParamSearchEnterprise({ size: 4, lang: locale as Lang }))
  ).data;

  let articleData: ListResponse<Article> = LIST_DATA_RESPONSE;
  if (categories.length) {
    articleData = await getListArticleService(
      getParamSearchEnterprise({
        size: ARTICLE_ENTERPRISE_SIZE,
        lang: locale as Lang,
        slugCategory: categories[0].slug,
        isFeature: -1,
      })
    );
  }

  return {
    props: { articleData, categories },
    revalidate: 10,
  };
};

export default index;
