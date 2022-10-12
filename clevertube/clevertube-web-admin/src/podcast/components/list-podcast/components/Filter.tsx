import { memo } from "react";
import { FilterIcon } from "src/common/assets/icons/filter";
import Button from "./Button";

const Filter = () => {
  return (
    <Button
      label="Filter"
      w="81px"
      h="36px"
      p="8px"
      fontSize="13px"
      color="black.text"
      bg="background.primary"
      _hover={{ bg: "transparent" }}
      border="1px"
      borderColor="border.primary"
      rightIcon={<FilterIcon fill="#216BCD" boxSize="5" />}
    ></Button>
  );
};

export default memo(Filter);
