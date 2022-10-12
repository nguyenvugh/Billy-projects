import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import "swiper/css";
import "../../i18n";
import { LoadingBar } from "../common/components/loading-bar/LoadingBar";
import { store } from "../common/redux/store";
import { theme } from "../common/theme/theme";
import { HomeLayout } from "../components/layout/HomeLayout";
import "../styles/editor-quill.css";
import "../styles/globals.css";
import "swiper/css";
import "swiper/css/bundle";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const MyApp = ({ Component, pageProps }: AppProps) => {
  //@ts-ignore
  const Layout = Component.layout ? Component.layout : HomeLayout;
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <LoadingBar />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
};

export default MyApp;
