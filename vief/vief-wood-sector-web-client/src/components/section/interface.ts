import { ChakraProps } from "@chakra-ui/react";

export interface SectionHeaderProps {
  wrapperStyle?: ChakraProps;
  category?: string;
  title?: string;
  titleWidth?: string;
  titleHeight?: string;
  heading?: string;
  headingWidth?: string;
  headingHeight?: string;
  headingMarginTop?: string;
  isReverse?: boolean;
  alignItems?: "center";
}

export interface SectionProps {
  wrapperStyle?: ChakraProps;
  marginLeftRight?: string;
  children: React.ReactNode;
}

export interface ButtonComponentProps {
  wrapperStyle?: ChakraProps;
  btnTitle?: string;
  isArrowForward?: boolean;
  textHeight?: string;
  isDisabled?: boolean;
  onHandleSubmit?: () => void;
}

export interface HeadingComponentProps {
  heading?: string;
  wrapperStyle?: ChakraProps;
}

export interface ShortDesProps {
  shortDes?: string;
  wrapperStyle?: ChakraProps;
  textWidth?: string;
  textHeight?: string;
  btnTitle?: string;
  haveButton?: boolean;
  textAlign?: "justify" | "unset";
}

export interface TitleProps {
  title?: string;
  wrapperStyle?: ChakraProps;
  category?: string;
  isBorderBottom?: boolean;
  textColor?: string;
  lineHeight?: string;
}
