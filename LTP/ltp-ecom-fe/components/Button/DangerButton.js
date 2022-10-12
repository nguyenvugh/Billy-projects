import { Button } from "@chakra-ui/react";

const DangerButton = ({ ...rest }) => (
  <Button
    bgColor="#EA403F"
    _hover={{ bgColor: "#EA403F" }}
    _active={{ bgColor: "#EA403F" }}
    borderRadius={4}
    color="#ffffff"
    fontSize={16}
    {...rest}
  />
);

export default DangerButton;
