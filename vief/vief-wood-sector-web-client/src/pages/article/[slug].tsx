import { RenderBreadcrumb } from "@/src/common/components/renderBreadcumb";
import { getBreadCrumbArticleDetail } from "@/src/common/configs/breadcrumb.configs";
import { LANG } from "@/src/common/constants/common.constant";
import { ROUTES } from "@/src/common/constants/routes.constant";
import { Lang } from "@/src/common/interfaces/common.interface";
import { getArticleDetailService, getListArticleService } from "@/src/common/services/common.services";
import { ArticleDetail } from "@/src/components/article-detail";
import { ArticleDetailProps } from "@/src/components/article-detail/interface";
import { GetServerSideProps } from "next";

function Index({ articleDetail, relateNews, extraNews }: ArticleDetailProps) {
  return (
    <ArticleDetail
      breadcrumb={
        <RenderBreadcrumb
          breadcrumbConfigs={getBreadCrumbArticleDetail(ROUTES[articleDetail.category.type]["en"])}
          dataLabel={{ articleName: articleDetail.article.title }}
        />
      }
      articleDetail={articleDetail}
      relateNews={relateNews}
      extraNews={extraNews}
    />
  );
}

export const getServerSideProps: GetServerSideProps<ArticleDetailProps> = async ({ locale, params }) => {
  const articleSlug = (params?.slug || "") as string;
  const lang = (locale || LANG.vi) as Lang;

  const articleDetail = await getArticleDetailService(articleSlug, lang);
  const category = articleDetail.category;
  const articleCateSlug = category.slug;
  const articleCateType = category.type;

  const relateNewsRes = getListArticleService({ ...getParams(lang), type: articleCateType });
  const extraNewsRes = getListArticleService({ ...getParams(lang), slugCategory: articleCateSlug });
  const data = await Promise.all([relateNewsRes, extraNewsRes]);
  const relateNews = data[0].data;
  const extraNews = data[1];

  return {
    props: { articleDetail, relateNews, extraNews },
  };
};

function getParams(lang: Lang) {
  return {
    page: 1,
    size: 6,
    lang,
  };
}

export default Index;
