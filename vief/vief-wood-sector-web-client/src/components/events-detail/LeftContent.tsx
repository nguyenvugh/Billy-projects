import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Description from "../section-event/Description";
import Calendar from "../../Images/Icons/Calendar";
import Location from "@/src/Images/Icons/Location";
import WoodSector from "@/src/Images/Icons/WoodSector";
import { LeftContentProps } from "./interface";
import { formatDate } from "@/src/common/utils/common.utils";
import dayjs from "dayjs";

export default function LeftContent({ data }: LeftContentProps) {
  const { timeStart, field, location, content } = data;

  return (
    <Stack w={{ base: "696px", xl: "100%" }} spacing="0">
      <Box pb={"32px"}>
        <Text variant={"text14"} fontWeight="600">
          Thời gian
        </Text>
        <Description wrapperStyle={{ mt: "16px" }} content={formatDate(timeStart!)}>
          <Calendar />
        </Description>
        <Description wrapperStyle={{ mt: "8px" }} content={location}>
          <Location />
        </Description>
        <Description wrapperStyle={{ mt: "8px" }} content={field}>
          <WoodSector />
        </Description>
      </Box>
      <Box pb="32px">
        <Text variant={"text14"} fontWeight="600">
          Mô tả
        </Text>
        <Box textAlign={"justify"} mt="16px" dangerouslySetInnerHTML={{ __html: content }} />
      </Box>
    </Stack>
  );
}
