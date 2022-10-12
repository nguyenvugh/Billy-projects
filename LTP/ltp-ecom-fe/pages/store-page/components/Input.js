import { Input, Textarea } from "@chakra-ui/react";

export default function InputText({ textarea, ...props }) {
  return textarea ? (
    <Textarea
      border="1px solid #BCCCFF"
      background="#E9EEFF"
      borderRadius={6}
      padding="12px 32px"
      color="#071133"
      fontSize="16px"
      {...props}
    />
  ) : (
    <Input
      border="1px solid #BCCCFF"
      background="#E9EEFF"
      borderRadius={6}
      padding="12px 32px"
      color="#071133"
      fontSize="16px"
      {...props}
    />
  );
}
