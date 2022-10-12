import { ROUTE_EVENT_DETAIL } from "@/src/common/constants/routes.constant";
import { useViefRouter } from "@/src/common/hooks/useViefRouter";
import { replacePathParams } from "@/src/common/lib/common.lib";
import { formatDate } from "@/src/common/utils/common.utils";
import ButtonComponent from "@/src/components/section/components/Button";
import Location from "@/src/Images/Icons/Location";
import WoodSector from "@/src/Images/Icons/WoodSector";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Calendar from "../../Images/Icons/Calendar";
import { getTimelineEvent } from "../events/constant";
import Description from "./Description";
import { Event } from "./interface";
import TimeLeft from "./TimeLeft";

interface EventContentItemProps {
  event: Event;
}
export default function EventContentItem({ event }: EventContentItemProps) {
  const { thumbnail, shortDesc, title, timeStart, timeEnd, location, field, slug } = event!;
  const isUpcoming = getTimelineEvent(timeStart, timeEnd) === "UPCOMING";
  const router = useViefRouter();

  function handleRedirect(slug: string) {
    router.push(
      replacePathParams(ROUTE_EVENT_DETAIL["en"], {
        slug,
      })
    );
  }
  return (
    <Flex
      backgroundColor="white.secondary"
      flexDirection={"column"}
      alignItems={"center"}
      borderRadius={"14px"}
      onClick={() => handleRedirect(slug!)}
      cursor="pointer"
      height="662px"
    >
      <Box
        position="relative"
        w="full"
        h={{ md: "288px", sm: "257px" }}
        overflow={"hidden"}
        borderTopRadius="14px"
        sx={{
          ".event-card:hover &": {
            transform: "scale(1.2)",
          },
        }}
        pos="relative"
        flexShrink={0}
      >
        <Image src={thumbnail?.url || ""} alt="" priority layout="fill" />
      </Box>
      <VStack px="16px" py="32px" alignItems="start" spacing="16px" w="full" flexGrow={1}>
        <Text variant="text20" className="text-2-line">
          {title}
        </Text>
        <Text variant="text14" className="text-4-line">
          {shortDesc}
        </Text>

        <Flex flexDir="column" justifyContent="flex-end" flexBasis="1" w="full" flexGrow={1}>
          <VStack alignItems="flex-start">
            <Description content={formatDate(timeStart!)}>
              <Calendar />
            </Description>
            <Description content={location}>
              <Location />
            </Description>
            <Description content={field}>
              <WoodSector />
            </Description>
          </VStack>
          <Flex mt="10px">
            {isUpcoming && (
              <ButtonComponent
                btnTitle="Đăng ký nhanh"
                isArrowForward={false}
                textHeight="25px"
                wrapperStyle={{ mt: "0", mr: "16px" }}
              />
            )}
            <TimeLeft timeStart={timeStart} />
          </Flex>
        </Flex>
      </VStack>
    </Flex>
  );
}
