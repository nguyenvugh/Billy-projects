import { Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import EventContentItem from "./EventContentItem";
import { Event } from "./interface";

type Props = {
  events: Event[];
};
function EventsHome({ events }: Props) {
  if (events.length <= 0) return null;
  return (
    <VStack>
      <Text variant="text20" borderBottom="1.5px solid #394160" mb="36px">
        Sự kiện / Sắp diễn ra
      </Text>
      <Grid templateColumns={{ md: "repeat(3, 1fr)", sm: "repeat(1, 1fr)" }} gap="6">
        {events.map((event, index) => (
          <GridItem key={index}>
            <EventContentItem event={event} />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
}

export { EventsHome };
