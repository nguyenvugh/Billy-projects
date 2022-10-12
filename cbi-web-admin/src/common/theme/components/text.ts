const baseStyle = {};

const defaultProps = {
  colorScheme: "none",
};

const variantPageTitle = {
  minWidth: "max-content",
  fontWeight: 700,
  fontSize: "18px",
  _hover: {
    cursor: "pointer",
    textDecor: "underline",
  },
};
const variantTextEllipsis = {
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
};
const variants = {
  "page-title": variantPageTitle,
  "text-ellipsis": variantTextEllipsis,
};

const textThemes = {
  baseStyle,
  variants,
  defaultProps,
};
export { textThemes };
