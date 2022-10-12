import React from "react";
import Skeleton from "../skeleton";

type ResultsProps = {
  isLoading: boolean;
  children: React.ReactElement;
};
function Results({ children, isLoading }: ResultsProps) {
  return isLoading ? <Skeleton /> : children;
}

export default Results;
