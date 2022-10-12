import {
  Box,
  Text,
  Link as LinkUI,
  Divider,
  Image,
  Grid,
} from "@chakra-ui/react";
import Link from "next/link";

export default function ProductRelate(props: any) {
  const { title, viewAll, marginTop = "30px", href = "#", seeMore } = props;

  const onClick = () => {
    seeMore instanceof Function && seeMore();
  };

  return (
    <Box marginTop={marginTop} marginBottom="30px" position={"relative"}>
      <Grid
        templateColumns={"1fr 120px"}
        justifyContent="space-between"
        alignItems="center"
        zIndex={2}
      >
        <Text
          color="#171717"
          fontSize={{ base: "18px", md: "20px", xl: "24px" }}
          fontWeight="700"
          w={"fit-content"}
          bg="#ffff"
          pr={"20px"}
          maxW="300px"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {title}
        </Text>
        {!!viewAll && (
          <Box minW="120px" bg="#ffff" pl={"20px"}>
            <Link passHref shallow href={href}>
              <LinkUI
                color="#2D374"
                display={"inline-block"}
                fontSize="12px"
                onClick={onClick}
              >
                XEM TẤT CẢ
              </LinkUI>
            </Link>
            <Image
              src="/img/global/arrow-right.svg"
              ml="2"
              display={"inline-block"}
            />
          </Box>
        )}
      </Grid>
      <Divider position={"absolute"} top="49%" zIndex={-1} mr={"2%"} />
    </Box>
  );
}
