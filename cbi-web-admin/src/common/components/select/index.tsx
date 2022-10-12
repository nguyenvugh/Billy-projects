import { ChakraProps, Select as CkSelect } from "@chakra-ui/react";
import React from "react";

export type Options = {
  value: string;
  label: string;
};
export type SelectProps = {
  options: Options[];
  selectStyleProps?: ChakraProps;
} & any;
function SelectRef(
  { options, selectStyleProps, onChange, onBlur, name, ...rest }: SelectProps,
  ref,
) {
  return (
    <CkSelect
      {...selectStyleProps}
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      {...rest}
    >
      {options?.map((it) => (
        <option key={it.label} value={it.value}>
          {it.label}
        </option>
      ))}
    </CkSelect>
  );
}

const Select = React.forwardRef(SelectRef);
export { Select };
