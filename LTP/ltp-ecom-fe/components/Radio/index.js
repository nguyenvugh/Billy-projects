import { Box, Radio as RadioUI } from "@chakra-ui/react";

const Radio = ({ ...rest }) => (
  <Box
    __css={{
      ".chakra-radio": {
        cursor: "pointer",
      },
      ".chakra-radio .chakra-radio__control": {
        position: "relative",
        width: "18px",
        height: "18px",
        bgColor: "#E9EEFF",
        border: "1px solid #BCCCFF",
        _checked: {
          borderColor: "#2154FF",
        },
        _before: {
          width: "10px",
          height: "10px",
          bgColor: "#2154FF",
        },
      },
    }}
  >
    <RadioUI _hover={{ background: "#E9EEFF!important" }} {...rest} />
  </Box>
);

export default Radio;
