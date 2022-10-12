import React from "react";

function ArrowRight({ color, width, height, ...rest }) {
  return (
    <svg
      width={width || "10"}
      height={height || "18"}
      viewBox="0 0 10 18"
      xmlns="http://www.w3.org/2000/svg"
      fill={color || "#071133"}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.292893 0.804531C0.683417 0.412813 1.31658 0.412813 1.70711 0.804531L9.20711 8.32747C9.59763 8.71918 9.59763 9.35429 9.20711 9.74601L1.70711 17.2689C1.31658 17.6607 0.683417 17.6607 0.292893 17.2689C-0.0976311 16.8772 -0.0976311 16.2421 0.292893 15.8504L7.08579 9.03674L0.292893 2.22307C-0.0976311 1.83135 -0.0976311 1.19625 0.292893 0.804531Z"
      />
    </svg>
  );
}

export { ArrowRight };
