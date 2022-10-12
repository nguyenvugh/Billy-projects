import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "src/common/components/container";
import SlideHomePage from "src/home-page/components/slide-homepage";
// import IntroduceHomePage from "src/home-page/components/introduce";
import EvaluateCBI from "src/home-page/components/EvaluateCBI/index";
import LoyalCustomer from "src/home-page/components/loyal-customer";
import "@cbi/styles/Home.module.css";
import { getArticle } from "@cbi/services/article";
import { Article } from "@cbi/services/article/article.interface";
import ModalContainer from "@cbi/components/ModalContainer/index";
import { useRouter } from "next/router";
import Lodash from "lodash";
import { SCREEN_AUTH } from "@cbi/constants/index";
import { getDetailConfigByKeyService } from "src/dynamic-config/services";
import { ConfigKeys } from "src/dynamic-config/interfaces";
import { DEFAULT_HOME_CONFIG } from "src/home-page/components/slide-homepage/constants";
import {
  CommentorsSection,
  IntroduceSection,
  MainSection,
} from "src/home-page/components/slide-homepage/interfaces";
/**
 * This is the home page!
 * @returns {JSX.Element} : The JSX Code for home page.
 */

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    const homeConfigsRaw = await (
      await getDetailConfigByKeyService(ConfigKeys.PAGE_HOME)
    ).data.content;
    let jsonConfig = DEFAULT_HOME_CONFIG;
    if (homeConfigsRaw) {
      try {
        jsonConfig = JSON.parse(homeConfigsRaw);
      } catch (error) {
        jsonConfig = DEFAULT_HOME_CONFIG;
      }
    }

    const main = jsonConfig.main;
    const introduce = jsonConfig.introduce;
    const commentors = jsonConfig.commentors;
    const newEvents = (await getArticle({ limit: 3 })).data.results;

    return {
      props: {
        main,
        introduce,
        commentors,
        newEvents,
      },
      revalidate: 10,
    };
  } catch (e) {
    return {
      props: {
        main: DEFAULT_HOME_CONFIG.main,
        introduce: DEFAULT_HOME_CONFIG.introduce,
        commentors: DEFAULT_HOME_CONFIG.commentors,
        newEvents: [],
      },
      revalidate: 10,
    };
  }
};
interface HomeI {
  main: MainSection;
  introduce: IntroduceSection;
  commentors: CommentorsSection;
  newEvents: Article[];
}

const Home = ({ main, introduce, commentors }: HomeI) => {
  const router = useRouter();
  const refModalContainer = useRef<{ openModal: Function }>(null);
  useEffect(() => {
    const isScreenForgot = Lodash.get(router, "query.forget-password", "false");
    if (isScreenForgot === "true") {
      refModalContainer.current?.openModal(SCREEN_AUTH.FORGOT_PASSWORD);
    }
  }, [router]);
  return (
    <div>
      <Head>
        <title>Climate and environment action business index</title>
        <link rel="icon" type="image/png" href="favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta property="og:title" content="Climate and environment action business index" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.cebi.vn/" />
        <meta
          property="og:image"
          content="https://upload.wikimedia.org/wikipedia/vi/5/5d/Oxfam_logo_to_chuc.png"
        />
        <meta
          name="thumbnail"
          content="https://upload.wikimedia.org/wikipedia/vi/5/5d/Oxfam_logo_to_chuc.png"
        />
      </Head>

      <main>
        <SlideHomePage data={main} />
        {/* <IntroduceHomePage data={introduce} /> */}
        <Container>
          <EvaluateCBI data={introduce} />
        </Container>
        <LoyalCustomer data={commentors} />
        {/* <Container>
          <NewEvents articles={newEvents} />
        </Container> */}
      </main>
      <ModalContainer ref={refModalContainer} />
    </div>
  );
};

export default Home;
export interface SlideHomePageI {
  title: string;
  button: Object;
  content: string;
}
export interface IntroduceHomePageI {
  title: string;
  image: string;
  content: string;
}
export interface EvaluateCBII {
  title: string;
  description: string;
  data: Array<{ title: string; description: string; image: string }>;
}
export interface NewEventsI {
  title: string;
  description: string;
  data: Array<{
    id?: string;
    title: string;
    description: string;
    image: string;
    name: string;
  }>;
}

export interface LoyalCustomerI {
  title: string;
  description: string;
  data: Array<{
    content: string;
    user: { name: string; image: string; type: string };
  }>;
}
export interface DonorsHomePageI {
  title: string;
  description: string;
  data: Array<{
    image: string;
  }>;
}
