import LeftArrow from "@/src/Images/Icons/LeftArrow";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import TimeLeft from "../events/components/TimeLeft";
import { getTimelineEvent } from "../events/constant";
import FormSignup from "./FormSignup";
import { ContentProps } from "./interface";
import LeftContent from "./LeftContent";

export default function Content({ data }: ContentProps) {
  const isExpired = getTimelineEvent(data.timeStart, data.timeEnd) === "TOOK_PLACE";

  return (
    <Stack spacing="0">
      <Flex w={"100%"} alignItems="center" mb={{ base: "64px", sm: "48px" }}>
        <LeftArrow />
        <Link href={"/events"}>
          <a>
            <Text variant={"text20"} ml={"16px"}>
              Quay lại
            </Text>
          </a>
        </Link>
      </Flex>
      <Stack pb="32px">
        <Box w="full" h="608px" borderRadius="12px" overflow="hidden" pos="relative" mb={"32px"}>
          <Image src={data?.thumbnail?.url || ""} alt="" layout="fill" />
        </Box>
        <Box w="fit-content" bg="orange" p="8px 16px" borderRadius={"8px"} mb="32px">
          <TimeLeft timeStart={data.timeStart} wrapperStyle={{ color: "white", lineHeight: "20px" }} stroke="#fff" />
        </Box>
      </Stack>
      <Text variant={"text36"} pb="32px">
        {data.title}
      </Text>
      <Flex
        justifyContent={"space-between"}
        mt="32px"
        flexDirection={{ sm: "column", base: "row" }}
        pb={{ base: "64px", sm: "48px" }}
      >
        <LeftContent data={data} />
        <FormSignup isExpired={isExpired} />
      </Flex>
    </Stack>
  );
}
