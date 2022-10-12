import { EventDetailPageProps } from "@/src/pages/events/[slug]";
import { Stack, Text } from "@chakra-ui/react";
import SectionEvent from "../section-event";
import Content from "./Content";

export default function EventDetail({ event, relevantEvents }: EventDetailPageProps) {
  return (
    <Stack mb={"69px"} mt={{ base: "32px", sm: "16px" }}>
      {event && <Content data={event} />}
      <Text variant={"text28"} pb="32px">
        Sự kiện liên quan
      </Text>
      {relevantEvents && <SectionEvent events={relevantEvents} />}
    </Stack>
  );
}
