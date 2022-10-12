import { Button } from "@chakra-ui/react";

const PrimaryButton = ({ ...rest }) => (
  <Button
    bgColor="#2154FF"
    _hover={{ bgColor: "#2154FF" }}
    _active={{ bgColor: "#2154FF" }}
    borderRadius={4}
    color="#ffffff"
    {...rest}
  />
);

export default PrimaryButton;
