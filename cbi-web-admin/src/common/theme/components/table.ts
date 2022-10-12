const baseStyle = {
  table: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full",
    bg: "white",
    borderRadius: "4px",
  },
  th: {
    fontWeight: "bold",
    textTransform: "unset",
    letterSpacing: "wider",
    textAlign: "start",
    fontSize: "14px",
  },
  td: {
    textAlign: "start",
    fontSize: "14px",
  },
  caption: {
    mt: 4,
    fontFamily: "heading",
    textAlign: "center",
    fontWeight: "medium",
  },
};

const numericStyles = {
  "&[data-is-numeric=true]": {
    textAlign: "end",
  },
};

const variantSimple = (props) => {
  const isLightMode = props.colorMode === "dark";
  return {
    th: {
      color: isLightMode ? "gray.600" : "gray.400",
      borderBottom: "1px",
      fontSize: "14px",
      fontWeight: "600",
      ...numericStyles,
    },
    td: {
      borderBottom: "1px",
      ...numericStyles,
    },
    caption: {
      color: isLightMode ? "gray.600" : "gray.100",
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  };
};

const variants = {
  simple: variantSimple,
  unstyled: {},
};

const defaultProps = {
  variant: "simple",
  size: "md",
  colorScheme: "gray",
};

const tableThemes = {
  baseStyle,
  variants,
  defaultProps,
};
export { tableThemes };
