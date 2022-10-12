import { matchRoutes, useLocation } from "react-router-dom";
import { ROUTER } from "../constants/routes.constants";

export const useCurrentPath = () => {
  const arrRoutes = Object.values(ROUTER);
  const routes = arrRoutes.map((route) => {
    return { path: route };
  });

  const location = useLocation();
  const rs = matchRoutes(routes, location);
  if (rs) return rs[0].route.path;
};
