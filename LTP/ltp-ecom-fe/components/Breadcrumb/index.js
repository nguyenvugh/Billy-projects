import { Box, Breadcrumb as BreadcrumbUI } from "@chakra-ui/react";
import { RiArrowRightSLine } from "react-icons/ri";

const Breadcrumb = ({ children }) => {
  if (typeof window !== "undefined") {
    const ol = document.getElementsByClassName("chakra-breadcrumb__list");
    ol[0]?.setAttribute("itemscope", "");
    ol[0]?.setAttribute("itemtype", "http://schema.org/BreadcrumbList");
  }

  return (
    <Box as="nav" id="breadcrumb">
      <BreadcrumbUI
        as="div"
        separator={<RiArrowRightSLine />}
        color="#7B8794"
        fontSize={12}
        fontWeight={600}
        py={{ base: "18px", md: "36px" }}
      >
        {children}
      </BreadcrumbUI>
    </Box>
  );
};

export default Breadcrumb;
