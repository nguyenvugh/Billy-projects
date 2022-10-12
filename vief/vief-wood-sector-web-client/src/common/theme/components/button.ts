const baseStyle = {
  fontWeight: 500,
  fontSize: "14px",
  height: "40px",
  lineHeight: "1.2",
  color: "text",
  borderRadius: "6px",
  border: "1px solid #C5CAD3",
  transitionProperty: "common",
  transitionDuration: "normal",
  _focusVisible: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  _hover: {
    _disabled: {
      bg: "initial",
    },
  },
};

const variantGhost = {
  fontSize: "14px",
  fontWeight: "500",
};
const variantOutline = {};
const variantSolid = {
  fontSize: "14px",
  fontWeight: "500",
};
const variantLink = {};
const variantPrimary = {
  bg: "blue.primary",
  border: "none",
  color: "white",
  _hover: {
    bg: "primaryHovering",
  },
  _active: {
    bg: "deactive",
    color: "text",
  },
  fontSize: "14px",
  fontWeight: "600",
};
const variantUnstyled = {};

const variants = {
  ghost: variantGhost,
  outline: variantOutline,
  solid: variantSolid,
  link: variantLink,
  unstyled: variantUnstyled,
  primary: variantPrimary,
};

const sizes = {
  lg: {
    h: 12,
    minW: 12,
    fontSize: "lg",
    px: 6,
  },
  md: {
    h: "40px",
    minW: 10,
    fontSize: "md",
    px: 4,
  },
  sm: {
    h: 8,
    minW: 8,
    fontSize: "sm",
    px: 3,
  },
  xs: {
    h: 6,
    minW: 6,
    fontSize: "xs",
    px: 2,
  },
};

export const buttonTheme = {
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: "solid",
    size: "md",
    colorScheme: "gray",
  },
};
