import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AbilityContext } from "src/common/casl/Abilitites";
import { Resource } from "src/common/casl/interfaces";
import { LoginLazy } from "src/common/configs/routes.config";
import { ROUTE_LOGIN } from "src/common/constants/routes.constants";
import { useAuth } from "src/common/hooks/useAuth";
import { Page403 } from "./Page403";

type PrivateRouteProps = {
  resource?: Resource;
  children: React.ReactNode;
};
function PrivateRoute({ children, resource }: PrivateRouteProps) {
  const router = useNavigate();
  const auth = useAuth();
  const { pathname } = useLocation();
  const ability = useContext(AbilityContext);
  const [hasPer, setHasPer] = useState(false);

  function renderTargetPage() {
    if (!auth) {
      return <LoginLazy />;
    } else if (auth && hasPer) {
      return <>{children}</>;
    }
    return <Page403 />;
  }
  useEffect(() => {
    const isHasPermission = ability.can("manage", resource || "all") || resource === "all";
    setHasPer(isHasPermission);
    !auth && router(ROUTE_LOGIN);
  }, [pathname]);
  return renderTargetPage();
}

export default PrivateRoute;
