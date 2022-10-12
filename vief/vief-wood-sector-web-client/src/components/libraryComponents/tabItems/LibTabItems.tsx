import { Tab, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export const LibTabItem = ({ children }: { children?: ReactNode }) => {
  return (
    <Tab
      alignSelf="center"
      _selected={{ color: "white", bg: "brand.100" }}
      color="text"
      border={"1px solid #C5CAD3"}
      borderRadius={"6px"}
      fontSize="14px"
      fontWeight="500"
      mr={{ md: "32px", sm: "20px" }}
      // w={{ md: "112px", sm: "140px" }}
      py="8px"
      overflow="hidden"
      textOverflow="ellipsis"
    >
      {children}
    </Tab>
  );
};
