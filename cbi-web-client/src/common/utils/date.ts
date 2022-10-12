import { range } from "lodash";
import moment from "moment";

export const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

export const getDays = () => range(1, 32);

export const getMonths = () => range(1, 13);

export const getYears = (from: number, to: number) =>
  range(from, to || getCurrentYear() + 1);

export const formatDate = (date: string, format = "DD/MM/YYYY") => {
  if (date.trim() !== "") {
    return moment(date.trim()).format(format);
  }
  return "";
};

export const formatDateTime = (date: string) => {
  return moment(date.trim()).format("hh:mm A - DD/MM/YYYY");
};

// export const formatTimeLocale = (
//   date: string,
//   locale = "vi",
//   format = { hour: "2-digit", minute: "2-digit" }
// ) => {
//   if (typeof date === "string" && date.trim() !== "") {
//     date = new Date(date);
//     if (locale.includes("vi")) {
//       return date.toLocaleTimeString("vi-VN", format);
//     } else {
//       return date.toLocaleTimeString("en-US", format);
//     }
//   }
//   return "";
// };
// export const formatDateToLocal = (
//   date,
//   locale = "vi",
//   format = {
//     hour: "2-digit",
//     minute: "2-digit",
//     weekday: "long",
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }
// ) => {
//   if (typeof date === "string" && date.trim() !== "") {
//     date = new Date(date);
//     if (locale.includes("vi")) {
//       return date.toLocaleDateString("vi-VN", format);
//     } else {
//       return date.toLocaleDateString(undefined, format);
//     }
//   }
//   return "";
// };
// export const convertToDate = (dateString) => {
//   if (typeof dateString === "string") {
//     return moment(dateString.trim(), "YYYY-MM-DD hh:mm").toDate();
//   }
//   return undefined;
// };
