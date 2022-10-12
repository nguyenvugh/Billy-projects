import { Icon } from "@chakra-ui/react";
import React from "react";

const CaretLeftIcon = ({ ...props }) => {
  const fill = props.fill;
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
          d="M15.8228 17.9698V11.7398V6.1298C15.8228 5.1698 14.6628 4.6898 13.9828 5.3698L8.80282 10.5498C7.97282 11.3798 7.97282 12.7298 8.80282 13.5598L10.7728 15.5298L13.9828 18.7398C14.6628 19.4098 15.8228 18.9298 15.8228 17.9698Z"
          fill={fill || "white"}
        />
      </svg>
    </Icon>
  );
};

export { CaretLeftIcon };
