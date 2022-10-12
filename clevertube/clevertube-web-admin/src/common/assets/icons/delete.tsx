import { Icon } from "@chakra-ui/react";
import React from "react";

const DeleteIcon = ({ ...props }) => {
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
          d="M9.16998 14.83L14.83 9.17004"
          stroke={stroke || "white"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.83 14.83L9.16998 9.17004"
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

export { DeleteIcon };
