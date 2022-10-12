const baseStyleIcon = {
  width: "1.7rem",
  height: "100%",
  insetEnd: "0.5rem",
  position: "relative",
  color: "currentColor",
  fontSize: "1.5rem",
};

const baseStyle = {
  field: {
    backgroundColor: "white",
    cursor: "pointer",
  },
  icon: baseStyleIcon,
};

const defaultProps = {};

const variants = {
  outline: {
    field: {
      borderColor: "#E2E2E2",
      backgroundColor: "white",
    },
  },
};

const selectThemes = {
  baseStyle,
  variants,
  defaultProps,
};
export { selectThemes };
