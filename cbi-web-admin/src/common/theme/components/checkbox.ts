const baseStyleControl = {
  borderColor: "#A7A7A7",
  borderWidth: 1,
  _checked: {
    boxShadow: "none",
    bg: "green.primary",
    borderColor: "gray.disabled",
    _hover: {
      boxShadow: "none",
      bg: "green.primary",
      borderColor: "gray.disabled",
    },
  },
  _focus: {
    boxShadow: "none",
  },
};

const baseStyleIcon = {};

const baseStyleLabel = {
  minWidth: "max-content",
};

const baseStyle = {
  icon: baseStyleIcon,
  control: baseStyleControl,
  label: baseStyleLabel,
};

const defaultProps = {
  size: "md",
  colorScheme: "blue",
};

const checkboxThemes = {
  baseStyle,
  defaultProps,
};
export { checkboxThemes };
