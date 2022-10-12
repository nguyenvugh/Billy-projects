import { Box, Stack, StackProps } from "@chakra-ui/react";
import { ReactNode } from "react";

type ContainerProps = StackProps & {
  children: ReactNode;
};
function WebContainer({ children, ...styleProps }: ContainerProps) {
  return (
    <Box w="full">
      <Box
        {...styleProps}
        w={{
          sm: "full",
          base: "container",
        }}
        m="auto"
        px={{
          sm: "4",
          base: "unset",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export { WebContainer };
