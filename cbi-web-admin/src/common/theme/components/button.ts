const baseStyle = {
  // lineHeight: "1.2",
  // borderRadius: "md",
  fontWeight: "500",
  colorScheme: "teal",
  borderRadius: "4px",
  // transitionProperty: "common",
  // transitionDuration: "normal",
  // _focus: {
  //   boxShadow: "outline",
  // },
  // _disabled: {
  //   opacity: 0.4,
  //   cursor: "not-allowed",
  //   boxShadow: "none",
  // },
  // _hover: {
  //   _disabled: {
  //     bg: "initial",
  //   },
  // },
};

const defaultProps = {
  colorScheme: "none",
};

const variantSolid = (props) => ({
  bg: props.colorMode === "dark" ? "teal" : "green.primary",
  h: "40px",
  fontSize: "16px",
  color: "white",
  _hover: {
    shadow: "inner",
  },
  _disabled: {
    bg: "gray.disabled",
  },
});
const variants = {
  solid: variantSolid,
};

const buttonThemes = {
  baseStyle,
  variants,
  defaultProps,
};
export { buttonThemes };
