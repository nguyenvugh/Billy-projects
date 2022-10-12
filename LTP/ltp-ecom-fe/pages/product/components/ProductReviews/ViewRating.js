import { Flex, Text, Box } from "@chakra-ui/react";
import Loadash from "lodash";
import RenderStar from "../Star";

export default function ViewRating({ product, total }) {
  return (
    <Flex alignItems="center" flexDirection={{ base: "row", md: "column" }}>
      <Text
        color="#444444"
        fontWeight="500"
        fontSize={{ base: "48px", md: "65px", lg: "80px" }}
        lineHeight="80px"
      >
        {Loadash.get(product, "avg_rating", "")}
      </Text>
      <Box paddingLeft={{ base: "17.5px", md: "0" }} textAlign={{ base: "initial", md: "center" }}>
        <Flex padding={{ base: "0 0 9px 0", md: "19px 0" }}>
          <RenderStar
            width="28px"
            height="27px"
            num_rating={Loadash.get(product, "avg_rating", "")}
          />
        </Flex>
        <Text color="#262626" fontSize={{ base: "14px", md: "15px", lg: "16px" }}>
          {`${total} `} bình chọn
        </Text>
      </Box>
    </Flex>
  );
}
