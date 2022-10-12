// import React, { useContext, useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { Resource } from "src/common/casl/interfaces";
import { HomePageLazy } from "src/common/configs/routes.configs";
// import { Page403 } from "./Page403";

// Check logic before user access to a page for verifying authorization

type PrivateRouteProps = {
  resource?: Resource;
  children: React.ReactNode;
};
function PrivateRoute({ children, resource }: PrivateRouteProps) {
  console.log(children, resource);
  //   const router = useNavigate();
  //   const auth = useAuth();
  //   const { pathname } = useLocation();
  //   const ability = useContext(AbilityContext);
  //   const [hasPer, setHasPer] = useState(false);

  function renderTargetPage() {
    return <HomePageLazy />;
  }
  //     if (!auth) {
  //       return <HomePageLazy />;
  //     } else if (auth && hasPer) {
  //       return <>{children}</>;
  //     }
  //     return <Page403 />;
  //   }
  //   useEffect(() => {
  //     const isHasPermission =
  //       ability.can("manage", resource || "all") || resource === "all";
  //     setHasPer(isHasPermission);
  //     !auth && router(ROUTE_LOGIN);
  //   }, [pathname]);
  return renderTargetPage();
}

export default PrivateRoute;
