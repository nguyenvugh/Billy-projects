import { Icon } from "@chakra-ui/react";
import React from "react";

const SoundIcon = ({ ...props }) => {
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
          d="M3 8.25V15.75"
          stroke={stroke || "white"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 5.75V18.25"
          stroke={stroke || "white"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 3.25V20.75"
          stroke={stroke || "white"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 5.75V18.25"
          stroke={stroke || "white"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 8.25V15.75"
          stroke={stroke || "white"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
};

export { SoundIcon };
