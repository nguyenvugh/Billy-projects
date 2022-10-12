import { WebContainer } from "@/src/common/components/WebContainer";
import { LANG } from "@/src/common/constants/common.constant";
import { Lang } from "@/src/common/interfaces/common.interface";
import EventDetail from "@/src/components/events-detail";
import { getTimelineEvent } from "@/src/components/events/constant";
import { getArticleEvent, getEventDetailService } from "@/src/components/events/service";
import { Event } from "@/src/components/section-event/interface";
import { GetServerSideProps } from "next";

export type EventDetailPageProps = {
  event?: Event;
  relevantEvents?: Event[];
};
export default function index(props: EventDetailPageProps) {
  return (
    <WebContainer>
      <EventDetail {...props} />
    </WebContainer>
  );
}

export const getServerSideProps: GetServerSideProps<EventDetailPageProps> = async ({ locale, params }) => {
  const eventSlug = (params?.slug || "") as string;
  const lang = (locale || LANG.vi) as Lang;
  const event = await getEventDetailService(eventSlug, lang);
  let relevantEvents = undefined;
  if (event) {
    const timeline = getTimelineEvent(event.timeStart, event.timeEnd);
    relevantEvents = await (await getArticleEvent({ field: "WOOD", lang: locale as Lang, page: 1, timeline })).data;
  }
  return {
    props: {
      event,
      relevantEvents,
    },
  };
};
