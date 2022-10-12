import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from "@chakra-ui/react";
import { replacePathParams } from "src/common/lib/common.lib";
import { BreadcrumbsType } from "../../configs/interfaces";

type RenderBreadcrumbProps = {
  breadcrumbConfigs: BreadcrumbsType[];
  dataRoutes?: object;
  dataLabel?: object;
};
const RenderBreadcrumb = ({ breadcrumbConfigs, dataRoutes, dataLabel }: RenderBreadcrumbProps) => {
  return (
    <Breadcrumb borderBottom="1.5px solid #394160" w="full">
      {breadcrumbConfigs.map(({ label, link }, index) => {
        const isLastElement = breadcrumbConfigs.length - 1 === index;
        const finalLink = dataRoutes ? replacePathParams(link, dataRoutes) : link;
        return (
          <BreadcrumbItem key={index} isCurrentPage={isLastElement}>
            <BreadcrumbLink href={finalLink}>
              <Text
                variant={{
                  base: "text20",
                  sm: "text14",
                }}
              >
                {dataLabel ? replacePathParams(label, dataLabel) : label}
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};
export { RenderBreadcrumb };
