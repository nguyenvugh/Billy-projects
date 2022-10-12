import { Box, ChakraProvider } from "@chakra-ui/react";
import { AppUserProvider } from "@ltp/components/context/auth";
import { CompanyInfoProvider } from "@ltp/components/context/company-info";
import { keyCache } from "@ltp/constants/data";
import { readCache } from "@ltp/services/datacache";
import { ROUTES_404_INDEX } from "@ltp/utils/constant";
import { CheckoutProvider } from "components/context/checkout";
import { LanguageProvider } from "components/context/lan";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CartProvider } from "react-use-cart";
import { MetadataTags } from "SEOs/meta-tag";
import { SWRConfig } from "swr";
import "../styles/globals.css";
import "../styles/ckeditor.css";
import "../styles/info.css";
import "../styles/MultiRangeSlider.css";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import Topbar from "./layouts/Topbar";

function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();
  useEffect(() => {
    // const handleRouteChange = (url) => {
    //   ga.pageview(url);
    // };
    // When the component is mounted, subscribe to router changes
    // and log those page views
    // router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      // router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  if (pageProps.userIP) {
    if (typeof window !== "undefined") sessionStorage.setItem("userIP", pageProps.userIP);
  }
  const swrConfig = {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    dedupingInterval: 60000,
    provider: () => new Map(),
    onError: (error) => {
      if (error.status !== 403 && error.status !== 404) {
        // We can send the error to Sentry,
        // or show a notification UI.
      }
    },
  };
  const user = readCache(keyCache.UserInfo);
  return (
    <LanguageProvider>
      <AppUserProvider value={user}>
        <CompanyInfoProvider>
          <CheckoutProvider>
            <CartProvider>
              <SWRConfig value={swrConfig}>
                <ChakraProvider>
                  <Box sx={{ "a:hover": { textDecoration: "underline" } }}>
                    <MetadataTags />
                    <Topbar />
                    <Navbar />
                    <Component {...pageProps} />
                    <Footer />
                  </Box>
                </ChakraProvider>
              </SWRConfig>
            </CartProvider>
          </CheckoutProvider>
        </CompanyInfoProvider>
      </AppUserProvider>
    </LanguageProvider>
  );
}
MyApp.getInitialProps = async ({ Component, ctx }) => {
  if (ctx.res && ROUTES_404_INDEX.includes(ctx.asPath)) {
    ctx.res.writeHead(301, { location: "/" });
    ctx.res.end();
  }
  let pageProps = {};
  const errorCode = null;
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (ctx.req) {
    pageProps.userIP = ctx.req.socket?.remoteAddress;
  }

  pageProps.errorCode = pageProps.errorCode || errorCode;
  return { pageProps };
};
export default MyApp;
