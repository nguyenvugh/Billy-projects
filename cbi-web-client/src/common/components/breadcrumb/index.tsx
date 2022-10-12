import { Breadcrumb as BreadcrumbUI } from "@chakra-ui/react";
import { ReactChild, ReactChildren } from "react";
import { RiArrowRightSLine } from "react-icons/ri";

interface AuxProps {
  children: ReactChild[] | ReactChildren[];
}

const Breadcrumb = ({ children }: AuxProps) => {
  return (
    <BreadcrumbUI
      py={{ base: "18px", md: "36px" }}
      separator={<RiArrowRightSLine />}
      color="#7B8794"
      fontSize={12}
      fontWeight={600}
    >
      {children}
    </BreadcrumbUI>
  );
};

export default Breadcrumb;
