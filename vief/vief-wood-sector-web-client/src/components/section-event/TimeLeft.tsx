import { getTimeLeft } from "@/src/common/utils/common.utils";
import Clock from "@/src/Images/Icons/Clock";
import { Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { TimeLeftProps } from "./interface";

export default function TimeLeft({ timeStart, wrapperStyle }: TimeLeftProps) {
  const isPast = dayjs().isAfter(dayjs(timeStart));
  const timeLeft = !isPast ? getTimeLeft(timeStart) : "";

  return (
    <Flex {...wrapperStyle} alignItems="center">
      <Clock />
      <Text color={"orange.primary"} lineHeight="20px" fontWeight={600} ml={wrapperStyle?.ml || "8px"}>
        {isPast ? "Đã hết hạn đăng ký" : `Còn ${timeLeft}`}
      </Text>
    </Flex>
  );
}
