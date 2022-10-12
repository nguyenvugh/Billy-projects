import React from "react";
import Skeleton from "../skeleton";

type LoadingPageProps = {
  isLoading: boolean;
  children: React.ReactElement;
};
function LoadingPage({ isLoading, children }: LoadingPageProps) {
  return isLoading ? <Skeleton /> : children;
}

export { LoadingPage };
