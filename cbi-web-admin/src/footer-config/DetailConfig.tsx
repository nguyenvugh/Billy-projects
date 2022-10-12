import React from "react";
import { useParams } from "react-router-dom";
import { FooterConfig } from "./components/FooterConfig";
import { DynamicContentConfig } from "./components/DynamicContentConfig";
import { ConfigKeys } from "./interfaces";
import { HomePageConfig } from "./components/HomePageConfig";
function DetailConfig() {
  const params = useParams();

  const isFooterConfig = params.configKey === ConfigKeys.FOOTER_CONFIG;
  const isIntroConfig = params.configKey === ConfigKeys.PAGE_INTRO;
  const isConditionConfig = params.configKey === ConfigKeys.PAGE_CONDITIONS;
  const isPoliciesConfig = params.configKey === ConfigKeys.PAGE_POLICIES;
  const isHomePageConfig = params.configKey === ConfigKeys.PAGE_HOME;
  return (
    <>
      {isFooterConfig && <FooterConfig />}
      {isIntroConfig && <DynamicContentConfig configKey={ConfigKeys.PAGE_INTRO} />}
      {isConditionConfig && <DynamicContentConfig configKey={ConfigKeys.PAGE_CONDITIONS} />}
      {isPoliciesConfig && <DynamicContentConfig configKey={ConfigKeys.PAGE_POLICIES} />}
      {isHomePageConfig && <HomePageConfig />}
    </>
  );
}

export { DetailConfig };
