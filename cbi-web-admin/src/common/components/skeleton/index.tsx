import React from "react";
import { Skeleton as CkSkeleton, Stack } from "@chakra-ui/react";

type SkeletonProps = {
  row?: number;
  rowHeight?: number;
};
function Skeleton({ row, rowHeight }: SkeletonProps) {
  const ROW_NUMBER = row || 5;
  const ROW_HEIGHT = rowHeight || 20;
  return (
    <Stack>
      {Array.from(Array(ROW_NUMBER).keys()).map((key) => (
        <CkSkeleton key={key} height={`${ROW_HEIGHT}px`} />
      ))}
    </Stack>
  );
}

export default Skeleton;
