import dayjs from "dayjs";

export function formatDate(date: string, format?: string) {
  return dayjs(date).format(format || "DD/MM/YYYY HH:mm");
}
export function getLang() {
  return localStorage.getItem("i18nextLng") || "en";
}
