import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

const Subscribe = () => {
  return (
    <>
      <Stack direction={{ md: "row", sm: "column" }} alignItems={"center"} spacing="32px">
        {/* Display from tablet mode */}
        <Box
          w="50%"
          h="444px"
          borderRadius={"12px"}
          overflow="hidden"
          position="relative"
          display={{ md: "block", sm: "none" }}
        >
          <Image src="/researchIMG.png" objectFit={"cover"} alt="" priority layout="fill" />
        </Box>
        <Stack spacing="32px" w={{ md: "50%", sm: "full" }}>
          <Text variant="text28">Đăng ký nhận tin</Text>
          <Text variant="text14">
            Vulputate sem volutpat cras senectus lorem massa volutpat pellentesque dui. Tortor, pretium sed at hendrerit
            justo. Facilisis condimentum ultrices fermentum
          </Text>
          {/* Display in mobile mode */}
          <Box
            w="100%%"
            h="257px"
            borderRadius={"12px"}
            overflow="hidden"
            position="relative"
            display={{ md: "none", sm: "block" }}
          >
            <Image src="/researchIMG.png" objectFit={"cover"} alt="" priority layout="fill" />
          </Box>
          <Stack spacing="8px">
            <Text variant="text14">Họ và tên</Text>
            <Input bg="inputBg" borderRadius="6px" focusBorderColor="focusBorder" _focus={{ bg: "none" }} />
          </Stack>
          <Stack spacing="8px">
            <Text variant="text14">Email</Text>
            <Input bg="inputBg" borderRadius="6px" focusBorderColor="focusBorder" _focus={{ bg: "none" }} />
          </Stack>

          <Box>
            <Button variant="primary" w="132px">
              Đăng ký
            </Button>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Subscribe;
