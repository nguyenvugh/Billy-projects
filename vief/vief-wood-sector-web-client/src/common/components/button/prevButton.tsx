import { ChevronLeftIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

type ArrowButtonType = {
  onClick?: () => void;
};

export const PrevButton = ({ onClick }: ArrowButtonType) => {
  return (
    <IconButton
      display={{ sm: "none", md: "block" }}
      w="40px"
      aria-label=""
      isRound
      variant={"ghost"}
      border="3px solid #C5CAD3"
      alignSelf={"center"}
      alignContent={"center"}
      onClick={onClick}
      _hover={{ bg: "blue.primary", border: "none" }}
    >
      <ChevronLeftIcon boxSize="30px" color="#C5CAD3" _groupHover={{ color: "white" }} role={"group"} />
    </IconButton>
  );
};
