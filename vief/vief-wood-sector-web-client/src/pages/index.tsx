/* eslint-disable react/react-in-jsx-scope */
import { GetServerSideProps, GetStaticProps } from "next";
import { SEARCH_PARAMS_DEFAULT } from "../common/constants/common.constant";
import { Lang } from "../common/interfaces/common.interface";
import { getListArticleService } from "../common/services/common.services";
import { getArticleEvent } from "../components/events/service";
import { Home } from "../components/homeComponents";
import { HomePageProps } from "../components/homeComponents/interfaces";
import { getListBannerService } from "../components/homeComponents/services";
import { getListDocumentService } from "../components/libraryComponents/services";

const HomePage = (data: HomePageProps) => {
  return <Home {...data} />;
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({ locale }) => {
  const bannerRes = getListBannerService(locale as Lang);
  const policyRes = getListArticleService({
    ...SEARCH_PARAMS_DEFAULT,
    type: "POLICY",
    size: 2,
    isFeature: 1,
    lang: locale as Lang,
  });
  const enterpriseRes = getListArticleService({
    ...SEARCH_PARAMS_DEFAULT,
    type: "ENTERPRISE",
    size: 2,
    isFeature: 1,
    lang: locale as Lang,
  });
  const eventsRes = getArticleEvent({
    ...SEARCH_PARAMS_DEFAULT,
    size: 3,
    isFeature: 1,
    timeline: "UPCOMING",
    lang: locale as Lang,
  });
  const documentsRes = await getListDocumentService({
    ...SEARCH_PARAMS_DEFAULT,
    size: 4,
    lang: locale as Lang,
  });

  const data = await Promise.all([bannerRes, policyRes, enterpriseRes, eventsRes, documentsRes]);
  const banners = data[0].data;
  const policy = data[1].data;
  const enterprise = data[2].data;
  const events = data[3]?.data || [];
  const documents = data[4].data;

  return {
    props: {
      banners,
      policy,
      events,
      enterprise,
      documents,
    },
    revalidate: 30,
  };
};

export default HomePage;
