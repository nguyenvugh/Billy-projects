import { IconButton as ICButton } from "@chakra-ui/react";
import { IconButtonType } from "../interface";

const IconButton = ({ ...styleProps }: IconButtonType) => {
  return <ICButton color="color.primary" size="1px" variant="outline" {...styleProps} />;
};

export default IconButton;
