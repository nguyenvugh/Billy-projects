import React from "react";
import { DashBoardLayout } from "src/common/components/layouts/dasboard-layout";
import { Outlet } from "react-router-dom";

function Home() {
  return <DashBoardLayout outLet={<Outlet />} />;
}

export { Home };
