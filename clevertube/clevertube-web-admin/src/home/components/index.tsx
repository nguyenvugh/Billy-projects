import React from "react";
import { DashBoardLayout } from "src/common/components/layouts/index";
import { Outlet } from "react-router-dom";

function Home() {
  return <DashBoardLayout outLet={<Outlet />} />;
}

export default Home;
