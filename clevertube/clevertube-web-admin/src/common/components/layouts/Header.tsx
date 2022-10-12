import { Avatar, Box } from "@chakra-ui/react";
import { BREAD_CRUMB } from "../../configs/breadcrumb.config";
import { useCurrentPath } from "../../hooks/useCurrentPath";
import { RenderBreadcrumb } from "../breadcrumb";

function Header() {
  const url = useCurrentPath();
  const breadcrumbConfigs = BREAD_CRUMB[url as string];
  return (
    <Box
      w="full"
      h="56px"
      shadow="header"
      zIndex="100"
      bg="white"
      flexShrink={0}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px="5"
    >
      <Box>
        <RenderBreadcrumb
          breadcrumbConfigs={breadcrumbConfigs.data}
          icon={breadcrumbConfigs.icon}
        />
      </Box>
      <Avatar
        cursor="pointer"
        w="36px"
        h="36px"
        // onClick={() => {}}
        src={"src"}
      />
    </Box>
  );
}

export default Header;
