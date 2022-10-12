import { Box, Progress } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setPageLoading } from "../../redux/app.reducer";

function LoadingBar() {
  const { isPageLoading } = useAppSelector((state) => state.app);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleRouteChange = () => {
    dispatch(setPageLoading(true));
  };
  const handleRouteComplete = () => {
    dispatch(setPageLoading(false));
  };
  const handleRouteError = () => {
    dispatch(setPageLoading(false));
  };
  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);
    router.events.on("routeChangeError", handleRouteError);
  }, []);
  return (
    <Box pos="absolute" w="100vw" zIndex={100000} display={isPageLoading ? "block" : "none"}>
      <Progress size="sm" isIndeterminate />
    </Box>
  );
}

export { LoadingBar };
