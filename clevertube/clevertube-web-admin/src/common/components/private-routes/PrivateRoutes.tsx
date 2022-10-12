// import React, { useContext, useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Resource } from "src/common/casl/interfaces";
import { LoginPage } from "src/common/configs/routes.configs";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ROUTER } from "../../constants/routes.constants";
import useAuth from "../../hooks/useAuth";
const { LOGIN_PAGE } = ROUTER;
// import { Page403 } from "./Page403";

// Check logic before user access to a page for verifying authorization

type PrivateRouteProps = {
  resource?: Resource;
  children: React.ReactNode;
};
function PrivateRoute({ children, resource }: PrivateRouteProps) {
  console.log(children, resource);
  const auth = useAuth();
  const { pathname } = useLocation();
  // const ability = useContext(AbilityContext);
  // const [hasPer, setHasPer] = useState(false);
  const router = useNavigate();

  function renderTargetPage() {
    // return <LoginPage />;
    // }
    if (!auth) {
      return <LoginPage />;
    } else if (auth) {
      return <>{children}</>;
    }
    return <LoginPage />;
  }
  // }
  useEffect(() => {
    // const isHasPermission =
    //   ability.can("manage", resource || "all") || resource === "all";
    // setHasPer(isHasPermission);
    !auth && router(LOGIN_PAGE);
  }, [pathname]);
  return renderTargetPage();
}

export default PrivateRoute;
