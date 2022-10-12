import { HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BreadcrumbsType } from "src/common/interfaces/breadcrumb.interface";
import { replacePathParams } from "src/common/lib/common.lib";

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
      {breadcrumbConfigs.map(({ label, link }, index) => {
        const isLastElement = breadcrumbConfigs.length - 1 === index;
        return (
          <HStack key={label}>
            <Text variant="page-title" onClick={() => handleNavigate(link)}>
              {dataLabel ? replacePathParams(label, dataLabel) : label}
            </Text>
            {!isLastElement && (icon || <Icon as={IoIosArrowForward} />)}
          </HStack>
        );
      })}
    </HStack>
  );
};
export { RenderBreadcrumb };
