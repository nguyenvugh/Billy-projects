import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { Lang } from "../interfaces/common.interface";

export function formatDate(date: string, format?: string) {
  return dayjs(date).format(format || "DD/MM/YYYY HH:mm");
}
export function getLang() {
  return localStorage.getItem("i18nextLng") || "vi";
}

export function getTimeLeft(timeStart: string) {
  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    relativeTime: {
      future: "%s nữa",
      past: "%s trước",
      s: "vài giây trước",
      m: "phút",
      mm: "%d phút",
      h: "1 giờ",
      hh: "%d giờ",
      d: "1 ngày",
      dd: "%d ngày",
      M: "1 tháng",
      MM: "%d tháng",
      y: "1 năm",
      yy: "%d nắm",
    },
  });
  return dayjs(timeStart).fromNow();
}
