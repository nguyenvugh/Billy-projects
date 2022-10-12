import { Center, Stack, Text } from "@chakra-ui/react";
import { ItemPartner } from "./itemPartner";

const Partner = () => {
  return (
    <>
      <Center>
        <Stack spacing={{ sm: "24px", md: "42px" }}>
          <Text variant="text28" textAlign="center">
            Đối tác hợp tác
          </Text>
          <Stack
            justifyContent="space-between"
            spacing={{ sm: "24px", md: "64px" }}
            direction={{ md: "row", sm: "column" }}
          >
            <ItemPartner />
          </Stack>
        </Stack>
      </Center>
    </>
  );
};

export default Partner;
