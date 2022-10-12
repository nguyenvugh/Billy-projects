import { Button } from "@chakra-ui/react";

const WarningButton = ({ ...rest }) => (
  <Button
    bgColor="#FEBD17"
    _hover={{ bgColor: "#FEBD17" }}
    _active={{ bgColor: "#FEBD17" }}
    borderRadius={4}
    color="#ffffff"
    fontSize={16}
    {...rest}
  />
);

export default WarningButton;
