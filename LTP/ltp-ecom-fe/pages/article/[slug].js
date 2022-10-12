import { useAppUserContext } from "@ltp/components/context/auth";
import { LANG_VI } from "@ltp/constants/languages";
import { getNewsDetailOtherLangSlug, getNewsDetailSlug, getNewsHot } from "@ltp/services/news";
import { ROUTE_BlOG } from "@ltp/utils/constant";
import { getDataRedirect } from "@ltp/utils/redirect.utils";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import { useRouter } from "next/router";
import Custom404 from "pages/404";
import { useEffect } from "react";
import PostPage from "./components/PostPage";

const Post = ({ news, related, hot, slug, statusCode }) => {
  const { setOnLanguageChange } = useAppUserContext();
  const router = useRouter();

  async function handleOtherLangArticle(other_lang) {
    const newSlug = await getNewsDetailOtherLangSlug({
      slug,
      other_lang,
    });
    const newRoute = addTrailingSlash(ROUTE_BlOG(other_lang, newSlug));
    router.push({ pathname: newRoute }, newRoute, {
      locale: other_lang,
    });
  }

  useEffect(() => {
    setOnLanguageChange(() => handleOtherLangArticle);
  }, []);

  if (statusCode === 404) {
    return <Custom404 />;
  }
  return <PostPage news={news} related={related} hot={hot} />;
};

export const getServerSideProps = async ({ params, locale, res }) => {
  try {
    const { slug = "" } = params;
    const newsDetail = await getNewsDetailSlug(slug, { lang: locale });
    const res2 = await getNewsHot();

    const { isRedirect, dataRedirect, statusCode } = getDataRedirect(
      newsDetail?.code,
      ROUTE_BlOG(locale, newsDetail?.data),
      ROUTE_BlOG(LANG_VI, slug),
      locale,
      res,
    );
    if (isRedirect) {
      return dataRedirect;
    }

    res.statusCode = statusCode;
    return {
      props: {
        statusCode,
        news: newsDetail.data?.news || {},
        related: newsDetail.data?.relateds || [],
        hot: res2.data?.data || [],
        slug: slug || "",
      },
    };
  } catch (e) {
    return {
      props: {
        news: {},
        related: [],
        hot: [],
        slug: "",
        statusCode: 404,
      },
    };
  }
};
export default Post;
