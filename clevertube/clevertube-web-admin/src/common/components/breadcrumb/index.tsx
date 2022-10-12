import { HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { replacePathParams } from "src/common/lib/common.lib";
import { BreadcrumbsType } from "./interfaces";

type RenderBreadcrumbProps = {
  icon?: React.ReactNode;
  breadcrumbConfigs: BreadcrumbsType[];
  dataRoutes?: object;
  dataLabel?: object;
};
const RenderBreadcrumb = ({
  icon,
  breadcrumbConfigs,
  dataRoutes,
  dataLabel,
}: RenderBreadcrumbProps) => {
  const navigate = useNavigate();

  function handleNavigate(link?: string) {
    link && navigate(dataRoutes ? replacePathParams(link, dataRoutes) : link);
  }

  return (
    <HStack w="full" spacing="1">
      {icon}
      {breadcrumbConfigs.map(({ label, link }, index) => {
        const isLastElement = breadcrumbConfigs.length - 1 === index;
        return (
          <HStack key={index}>
            <Text
              variant="page-title"
              onClick={() => handleNavigate(link)}
              color="#1A1A1A"
              fontWeight={400}
              fontSize="14px"
            >
              {dataLabel ? replacePathParams(label, dataLabel) : label}
            </Text>
            {!isLastElement && <Image src="/assets/icons/Line-2.svg" />}
          </HStack>
        );
      })}
    </HStack>
  );
};
export { RenderBreadcrumb };
