import { Icon } from "@chakra-ui/react";
import React from "react";

const AddImageIcon = ({ ...props }) => {
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
          d="M22 9V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2"
          stroke={stroke || "white"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 2V5M17 8V5M17 5H20M17 5H14"
          stroke={stroke || "white"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8.5" cy="7.5" r="1.75" stroke={stroke || "white"} strokeWidth="1.5" />
        <path
          d="M21 12C14.558 12 10.895 13.985 8.945 16.243M16 21C14.296 18.232 11.573 16.852 8.945 16.243M8.945 16.243C6.637 15.707 4.403 15.766 3 16"
          stroke={stroke || "white"}
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
};

export { AddImageIcon };
