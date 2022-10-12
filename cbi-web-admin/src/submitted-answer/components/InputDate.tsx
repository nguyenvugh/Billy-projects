import { Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { forwardRef } from "react";
import { ReactComponent as CalIcon } from "src/common/assets/icons/iconCalendar.svg";

export const InputDate = forwardRef(({ value, onClick }: any, _ref) => (
  <InputGroup w="150px">
    <Input onFocus={onClick} value={value} />
    <InputRightElement>
      <Icon as={() => <CalIcon w="6" />} />
    </InputRightElement>
  </InputGroup>
));
