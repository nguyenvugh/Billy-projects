import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import "./i18n";
import { CustomBrowserRouter } from "./CustomBrowserRouter";
import { RoutesConfig } from "./common/interfaces/common.interfaces";
import { ROUTES_CONFIG } from "src/common/configs/routes.configs";
import { Page404 } from "src/common/components/routes-default/Page404";
import { theme } from "./common/theme/theme";
// import PrivateRoute from "src/common/components/private-routes/PrivateRoutes";
import { store } from "./common/redux/store";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const client = new QueryClient();
root.render(
  <React.StrictMode>
    <Suspense fallback={<h1>Loading...</h1>}>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <ChakraProvider theme={theme}>
            <CustomBrowserRouter>
              <Routes>
                {generateRoutes(ROUTES_CONFIG)}
                <Route path="*" element={<Page404 />} />
              </Routes>
            </CustomBrowserRouter>
          </ChakraProvider>
        </QueryClientProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
function generateRoutes(routesConfig: RoutesConfig[]) {
  return routesConfig.map(({ pathName, component: Component, routes }, index) => {
    return (
      <Route
        key={pathName + index}
        path={pathName}
        element={
          // <PrivateRoute>
          <Component />
          /* </PrivateRoute> */
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
reportWebVitals();
