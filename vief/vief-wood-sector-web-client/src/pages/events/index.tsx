import { WebContainer } from "@/src/common/components/WebContainer";
import { Lang } from "@/src/common/interfaces/common.interface";
import Events from "@/src/components/events";
import { EventSearchParams, EventsProps, EventTimeline } from "@/src/components/events/interface";
import { getArticleEvent } from "@/src/components/events/service";
import { GetStaticProps, InferGetServerSidePropsType } from "next";

export default function index({ upcomingEvents, pastEvents }: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <WebContainer>
      <Events upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
    </WebContainer>
  );
}

export const getStaticProps: GetStaticProps<EventsProps> = async ({ locale }) => {
  const upcomingEventsRes = getArticleEvent(getParams("UPCOMING", locale, 10));
  const pastEventsRes = getArticleEvent(getParams("TOOK_PLACE", locale, 6));

  const data = await Promise.all([upcomingEventsRes, pastEventsRes]);

  const upcomingEvents = data[0]?.data || [];
  const pastEvents = data[1];
  return {
    props: {
      upcomingEvents,
      pastEvents,
    },
    revalidate: 10,
  };
};

function getParams(timeline: EventTimeline, locale?: string, size?: number): EventSearchParams {
  const params: EventSearchParams = { field: "WOOD", lang: locale as Lang, page: 1, timeline };
  if (size !== undefined) params.size = size;
  return params;
}
