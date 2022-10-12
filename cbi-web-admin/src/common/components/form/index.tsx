import { Box, ChakraProps, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { UseFormRegister, UseFormReturn } from "react-hook-form";
import { ErrorMess } from "../error-message-form";
import { Label } from "../label";

type FormProps = {
  children: React.ReactElement<ItemProps>[] | React.ReactElement<ItemProps>;
  onSubmit?: (data: object) => void;
  methodsHookForm: UseFormReturn<any, any>;
  preventAutoReset?: boolean;
} & ChakraProps;
function Form({ children, preventAutoReset, onSubmit, methodsHookForm, ...rest }: FormProps) {
  const {
    handleSubmit,
    formState: { errors },
  } = methodsHookForm;

  useEffect(() => {
    return handleResetForm;
  }, []);

  function handleResetForm() {
    if (preventAutoReset) return;
    methodsHookForm.clearErrors();
    methodsHookForm.reset();
  }
  return (
    <Box onSubmit={onSubmit && handleSubmit(onSubmit)} {...rest}>
      {React.Children.map(children, (child) => {
        return (
          <Stack direction="column" spacing="10px">
            {child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register: methodsHookForm.register,
                    key: child.props.name,
                    error: errors[child.props.name]?.message,
                  },
                })
              : child}
          </Stack>
        );
      })}
    </Box>
  );
}

type ItemProps = {
  name: string;
  label?: string;
  rules?: [];
  isRequired?: boolean;
  children: React.ReactElement;
  register?: UseFormRegister<any>;
  error?: string;
  methodsHookForm?: UseFormReturn<any, any>;
  styleErrors?: ChakraProps;
} & ChakraProps;
const Item = ({
  name,
  label,
  error,
  isRequired,
  register,
  children,
  methodsHookForm,
  styleErrors,
  ...rest
}: ItemProps) => {
  const regis = methodsHookForm ? methodsHookForm.register : register;
  const err = methodsHookForm ? methodsHookForm.formState?.errors[name]?.message : error;
  return (
    <Box mt="2" {...rest}>
      {label && <Label label={label} isRequired={isRequired}></Label>}
      {React.Children.map(children, (child) => {
        return React.createElement(child.type, {
          ...{
            ...child.props,
            ...(regis?.(name) || {}),
            key: name,
            isError: err,
          },
        });
      })}
      <ErrorMess {...styleErrors} error={err} />
    </Box>
  );
};

Form.Item = Item;

export { Form, Item };
