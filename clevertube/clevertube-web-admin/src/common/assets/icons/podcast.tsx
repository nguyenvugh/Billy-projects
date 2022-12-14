import { Icon } from "@chakra-ui/react";
import React from "react";

const PodcastIcon = ({ ...props }) => {
  const stroke = props.stroke;
  return (
    <Icon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 9.96004C9.63 7.15004 14.37 7.15004 18 9.96004"
          stroke={stroke || "white"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.60001 13.05C10.27 10.99 13.74 10.99 16.41 13.05"
          stroke={stroke || "white"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.8 16.1401C11.13 15.1101 12.87 15.1101 14.2 16.1401"
          stroke={stroke || "white"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
          stroke={stroke || "white"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
};

export { PodcastIcon };
