import { ChakraProvider } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { render } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AbilityContext, ability } from "./common/casl/Abilitites";
import PrivateRoute from "./common/components/private-routes/PrivateRoute";
import { Page404 } from "./common/components/routes-default/Page404";
import { ROUTES_CONFIG } from "./common/configs/routes.config";
import { RoutesConfig } from "./common/interfaces/common.interface";
import { store } from "./common/redux/store";
import { theme } from "./common/theme/theme";
import { CustomBrowserRouter } from "./CustomBrowserRouter";
import "./i18n";
import "./styles/ckeditor.css";
// use for re-build
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <AbilityContext.Provider value={ability}>
              <CustomBrowserRouter>
                <Routes>
                  {generateRoutes(ROUTES_CONFIG)}
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </CustomBrowserRouter>
            </AbilityContext.Provider>
          </QueryClientProvider>
        </ChakraProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root"),
);

function generateRoutes(routesConfig: RoutesConfig[]) {
  return routesConfig.map(({ pathName, component: C, routes, resource }, index) => {
    return (
      // @ts-ignore
      <Route
        key={pathName + index}
        path={pathName}
        element={
          <PrivateRoute resource={resource}>
            {/* @ts-ignore */}
            <C />
          </PrivateRoute>
        }
      >
        {generateRoutes(routes)}
      </Route>
    );
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
