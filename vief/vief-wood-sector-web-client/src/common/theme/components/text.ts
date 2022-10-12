const baseStyle = {};

const variants = {
  outline: {},
  flushed: {},
  filled: {},
  unstyled: {},
  text48: {
    color: "text",
    fontWeight: "700",
    fontSize: "48px",
    lineHeight: "130%",
  },
  text36: {
    color: "text",
    fontWeight: "700",
    fontSize: "36px",
    lineHeight: "150%",
  },
  text28: {
    color: "text",
    fontWeight: "600",
    fontSize: "28px",
    lineHeight: "150%",
  },
  text24: {
    color: "text",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "150%",
  },
  text20: {
    color: "text",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "140%",
  },
  text16: {
    color: "text",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "140%",
  },
  text14: {
    color: "text",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "180%",
  },
  textError: {
    color: "error",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "175%",
  },
  textHelper: {
    color: "helper",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "175%",
  },
};

const sizes = {};

export const textareaTheme = {
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: "md",
    variant: "outline",
  },
};
