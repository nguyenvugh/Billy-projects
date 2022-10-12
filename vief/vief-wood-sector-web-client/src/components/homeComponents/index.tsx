import { WebContainer } from "@/src/common/components/WebContainer";
import { Stack } from "@chakra-ui/react";
import SectionCompany from "../section-company";
import { EventsHome } from "../section-event/EventsHome";
import SectionPolicy from "../section-policy";
import SectionAbout from "./about";
import Carousel from "./carousel/Carousel";
import { HomePageProps } from "./interfaces";
import SectionLibrary from "./library";
import Subscribe from "./subcribe/Subcribe";

function Home({ banners, policy, events, enterprise, documents }: HomePageProps) {
  return (
    <Stack>
      <Carousel banners={banners} />
      <WebContainer>
        <Stack py={{ sm: "48px", md: "128px" }} spacing={{ sm: "48px", md: "128px" }}>
          <SectionAbout />
          <SectionPolicy policies={policy} />
          <EventsHome events={events} />
          <SectionCompany articles={enterprise} />
          <SectionLibrary documents={documents} />
          <Subscribe />
        </Stack>
      </WebContainer>
    </Stack>
  );
}

export { Home };
