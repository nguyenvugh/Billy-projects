import { Box } from "@chakra-ui/react";

const Container = ({ children }) => (
  <Box maxWidth="1180px" ml="auto" mr="auto" pl={{ base: 2, md: 4 }} pr={{ base: 2, md: 4 }}>
    {children}
  </Box>
);

export default Container;
