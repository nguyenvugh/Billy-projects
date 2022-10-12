import { Box, ChakraProps } from "@chakra-ui/react";

const Container = ({
  children,
  ...chakarProps
}: { children: any } & ChakraProps) => {
  return (
    <Box
      maxWidth="1180px"
      ml="auto"
      mr="auto"
      pl={{ base: 2, md: 4 }}
      pr={{ base: 2, md: 4 }}
      {...chakarProps}
    >
      {children}
    </Box>
  );
};

export default Container;
