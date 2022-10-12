import { Icon } from "@chakra-ui/react";
import React from "react";

const CloseIcon = ({ ...props }) => {
  return (
    <Icon {...props}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.17004 15.7777L14.83 10.1177"
          stroke="#999999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.83 15.7777L9.17004 10.1177"
          stroke="#999999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 22.9478H15C20 22.9478 22 20.9478 22 15.9478V9.94775C22 4.94775 20 2.94775 15 2.94775H9C4 2.94775 2 4.94775 2 9.94775V15.9478C2 20.9478 4 22.9478 9 22.9478Z"
          stroke="#999999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
};

export { CloseIcon };
