import { ButtonType } from "src/podcast/interface";
import { Button as Btn } from "@chakra-ui/react";

const Button = ({ label, ...styleProps }: ButtonType) => {
  return (
    <Btn
      w="100px"
      bg="color.primary"
      color="text.secondary"
      _hover={{ bg: "hover.primary" }}
      {...styleProps}
    >
      {label}
    </Btn>
  );
};

export default Button;
