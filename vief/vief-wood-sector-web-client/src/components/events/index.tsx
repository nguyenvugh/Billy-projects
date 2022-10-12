import { Stack, Text } from "@chakra-ui/react";
import { EventsProps } from "./interface";
import SectionPast from "./section-past";
import SectionUpcoming from "./section-upcoming";

export default function Events({ upcomingEvents, pastEvents }: EventsProps) {
  return (
    <Stack pt="36px" pb="64px">
      <Stack alignSelf="center" width={{ sm: "100%" }} spacing="0">
        <Text
          variant="text20"
          borderBottom="1.5px solid #394160"
          w="fit-content"
          m="auto"
          mb={{ base: "64px", sm: "48px" }}
        >
          Sự kiện
        </Text>
        <SectionUpcoming upcomingEvents={upcomingEvents} />
        <SectionPast pastEvents={pastEvents} />
      </Stack>
    </Stack>
  );
}
