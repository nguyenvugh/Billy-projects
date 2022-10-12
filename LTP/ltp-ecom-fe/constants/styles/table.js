const baseStyles = {
  w: 8,
  h: 8,
  fontSize: "sm",
  borderRadius: "0px",
  margin: "0 4px",
};
const styleButton = {
  margin: "0 8px",
  borderRadius: "0px",
  height: "32px",
  minHeight: "32px",
  with: "32px",
  maxWidth: "32px",
  border: "1px solid #BCCCFF",
  background: "#FFFFFF",
};

const normalStyles = {
  ...baseStyles,
  _hover: {
    bg: "#F70D28",
    fontSize: "#FFFFFF",
  },
  bg: "#FFFFFF",
  border: "1px solid #BCCCFF",
};

const activeStyles = {
  ...baseStyles,
  _hover: {
    bg: "#F70D28",
    color: "#FFFFFF",
  },
  bg: "#F70D28",
  color: "#FFFFFF",
};

const separatorStyles = {
  w: 8,
  h: 8,
  bg: "#FFFFFF",
};

export const paginationStyles = {
  baseStyles,
  styleButton,
  normalStyles,
  activeStyles,
  separatorStyles,
};
