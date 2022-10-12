import React from "react";
import { Avatar, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTE_PROFILE } from "src/common/constants/routes.constants";
import { useFetchDataUser } from "src/profile/hooks/useFetchDataUser";
import { RootState } from "src/common/redux/store";

function Header() {
  const navigate = useNavigate();
  const imageIsUploading = useSelector((state: RootState) => state?.profileReducer?.file);
  const { data } = useFetchDataUser();
  return (
    <Box
      w="full"
      h="24"
      shadow="header"
      zIndex="1"
      bg="white"
      flexShrink={0}
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      px="5"
    >
      <Avatar
        cursor="pointer"
        w="12"
        h="12"
        onClick={() => navigate(ROUTE_PROFILE)}
        src={imageIsUploading || data?.data?.avatar?.url}
      />
    </Box>
  );
}

export default Header;
