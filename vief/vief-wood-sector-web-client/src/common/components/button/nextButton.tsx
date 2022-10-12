import { ChevronRightIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

type ArrowButtonType = {
  onClick?: () => void;
};

export const NextButton = ({ onClick }: ArrowButtonType) => {
  return (
    <IconButton
      display={{ sm: "none", md: "block" }}
      w="40px"
      aria-label=""
      isRound
      variant={"ghost"}
      border="3px solid #C5CAD3"
      alignSelf={"center"}
      onClick={onClick}
      role={"group"}
      _hover={{ bg: "blue.primary", border: "none" }}
    >
      <ChevronRightIcon
        boxSize="30px"
        borderRadius="100%"
        color="#C5CAD3"
        role={"group"}
        _groupHover={{ color: "white" }}
      />
    </IconButton>
  );
};
