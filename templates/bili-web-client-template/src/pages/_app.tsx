import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import "../../i18n";
import { store } from "../common/redux/store";
import { theme } from "../common/theme/theme";
import { Loading } from "src/common/components/Loading";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => {
      setIsLoading(true);
    };
    const handleRouteComplete = () => {
      setIsLoading(false);
    };
    const handleRouteError = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);
    router.events.on("routeChangeError", handleRouteError);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
      router.events.off("routeChangeError", handleRouteError);
    };
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
