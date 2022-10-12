import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { SectionContentProps } from "../../interface";
import SectionContentItem from "./section-content-item";

export default function SectionContent({ pastEvents }: SectionContentProps) {
  return (
    <SimpleGrid columns={{ md: 2, sm: 1 }} gap="32px">
      {pastEvents?.map((event, index) => (
        <GridItem key={index}>
          <SectionContentItem event={event} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
}
