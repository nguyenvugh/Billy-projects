import React from "react";
import { ClockProps } from "./interface";

export default function Clock({ wrapperStyle }: ClockProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22.1665C17.0625 22.1665 21.1665 18.0625 21.1665 13C21.1665 7.9375 17.0625 3.8335 12 3.8335C6.93751 3.8335 2.83301 7.9375 2.83301 13C2.83301 18.0625 6.93751 22.1665 12 22.1665Z"
        stroke={`${wrapperStyle?.stroke || "#F3A70F"}`}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M11.88 7.677L11.879 13.181L15.7655 17.0675M2 4.5L5.5 2M22 4.5L18.5 2"
        stroke={`${wrapperStyle?.stroke || "#F3A70F"}`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
