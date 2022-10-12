import { keyCache } from "@cbi/constants/data";
import { LANG_VI } from "@cbi/constants/index";
import { UserProvider } from "@cbi/context/AuthContext";
import { LanguageProvider } from "@cbi/context/LangContext";
import { readCache } from "@cbi/utils/dataCache";
import { Box, ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";
import { ConfigKeys, ConfigValue } from "src/dynamic-config/interfaces";
import { getDetailConfigByKeyService } from "src/dynamic-config/services";
import FooterLayout from "src/home-page/components/footer";
import NavBottom from "src/home-page/components/header/nav-bar";
import NavTop from "src/home-page/components/header/top-bar";
import { DEFAULT_HOME_CONFIG } from "src/home-page/components/slide-homepage/constants";
import { DonorsSection } from "src/home-page/components/slide-homepage/interfaces";
import "../styles/ckeditor.css";
import "../styles/globals.css";
function MyApp({
  Component,
  pageProps,
  donors,
  footerConfig,
}: AppProps & {
  donors: DonorsSection;
  footerConfig: ConfigValue;
}) {
  const user = readCache(keyCache.UserInfo, {});
  return (
    <Box>
      <LanguageProvider value={LANG_VI}>
        <UserProvider value={user}>
          <ChakraProvider>
            <NavTop />
            <NavBottom />
            <Component {...pageProps} />
            <FooterLayout donors={donors} footerConfig={footerConfig} />
          </ChakraProvider>
        </UserProvider>
      </LanguageProvider>
    </Box>
  );
}

MyApp.getInitialProps = async () => {
  const homeConfigsRaw = (
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

  const footerConfig = (
    await getDetailConfigByKeyService(ConfigKeys.FOOTER_CONFIG)
  ).data;
  const donors = jsonConfig.donors;
  return { donors, footerConfig };
};

export default MyApp;
