import { ListResponse, SearchParams } from "@/src/common/interfaces/common.interface";
import { ChakraProps } from "@chakra-ui/react";
import { Event } from "../section-event/interface";

export interface ButtonEventComponentProps {
  wrapperStyle?: ChakraProps;
  btnTitle?: string;
  isArrowForward?: boolean;
  textHeight?: string;
}

export interface SectionContentItemProps {
  wrapperStyle?: ChakraProps;
}

export interface SectionPastProps {
  wrapperStyle?: ChakraProps;
}

export interface TimeLeftProps {
  timeStart: string;
  wrapperStyle?: ChakraProps;
  stroke?: string;
}

export interface SectionUpcomingProps {
  upcomingEvents: Event[];
}

export interface SectionContentProps {
  pastEvents?: Event[];
}

export interface SectionPastProps {
  pastEvents: ListResponse<Event>;
}

export interface EventsPageProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

export interface EventsProps {
  upcomingEvents: Event[];
  pastEvents: ListResponse<Event>;
}

export type EventTimeline = "UPCOMING" | "HAPPENING" | "TOOK_PLACE";
export interface EventSearchParams extends SearchParams {
  timeline?: EventTimeline;
  location?: string;
}
