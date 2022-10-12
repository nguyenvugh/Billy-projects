import Description from "@/src/components/section-event/Description";
import Calendar from "@/src/Images/Icons/Calendar";
import { Event } from "@/src/components/section-event/interface";
import Location from "@/src/Images/Icons/Location";
import { Box, Text, VStack } from "@chakra-ui/react";
import { formatDate } from "@/src/common/utils/common.utils";
import { useViefRouter } from "@/src/common/hooks/useViefRouter";
import { replacePathParams } from "@/src/common/lib/common.lib";
import { ROUTE_EVENT_DETAIL } from "@/src/common/constants/routes.constant";
import Image from "next/image";

type SectionContentItemProps = {
  event: Event;
};
export default function SectionContentItem({ event }: SectionContentItemProps) {
  const { thumbnail, title, shortDesc, location, timeStart, slug } = event;

  const router = useViefRouter();

  function handleRedirect(slug: string) {
    router.push(
      replacePathParams(ROUTE_EVENT_DETAIL["en"], {
        slug,
      })
    );
  }

  return (
    <VStack
      w="full"
      flexDirection={{ md: "row", sm: "column" }}
      spacing="0"
      onClick={() => handleRedirect(slug!)}
      cursor="pointer"
      _hover={{
        boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.3)",
      }}
      transitionDuration={".3s"}
      borderRadius="12px"
      overflow="hidden"
    >
      <Box w={{ md: "280px", sm: "full" }} h="210px" mr={{ md: "16px", sm: "0px" }} pos="relative" flexShrink={0}>
        <Image src={thumbnail?.url || ""} alt="" layout="fill" />
      </Box>
      <VStack spacing="0" pt={{ sm: "16px", base: "0px" }} align="flex-start" flexGrow="1" height="200%" w="full">
        <Text variant="text20" className="text-2-line" cursor="pointer">
          {title}
        </Text>
        <Text variant="text14" className="text-2-line" pt="16px">
          {shortDesc}
        </Text>
        <Description wrapperStyle={{ pt: "16px" }} content={formatDate(timeStart!)}>
          <Calendar />
        </Description>
        <Description wrapperStyle={{ pt: "8px" }} content={location}>
          <Location />
        </Description>
      </VStack>
    </VStack>
  );
}
