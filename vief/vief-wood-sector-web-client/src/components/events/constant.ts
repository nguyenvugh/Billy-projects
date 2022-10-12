import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { EventTimeline } from "./interface";
dayjs.extend(isBetween);

export function getTimelineEvent(start: string, end: string): EventTimeline {
  if (dayjs().isBefore(dayjs(start))) return "UPCOMING";
  if (dayjs().isAfter(dayjs(end || start))) return "TOOK_PLACE";
  return "HAPPENING";
}
