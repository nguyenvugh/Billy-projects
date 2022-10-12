import { Box, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { docProps } from "../../interfaces";
import DownLoad from "./download/DownLoad";

function FileItems({ docItem }: docProps) {
  return (
    <Box bg="brand.bgItemFile" height="280px" borderRadius="12px">
      <Stack p={"16px 16px"} justifyContent="space-between" h="full">
        <Box boxSize={"56px"} borderRadius="100%" position="relative">
          <Image src="/iconFile.png" alt="file" layout="fill" />
        </Box>
        <Text variant={{ md: "text20", sm: "text16" }} className="text-3-line">
          {docItem.shortDesc}
        </Text>
        <Box>
          <DownLoad docItem={docItem} />
        </Box>
      </Stack>
    </Box>
  );
}

export { FileItems };
