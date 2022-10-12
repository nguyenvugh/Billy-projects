import { Box, Stack, Text } from "@chakra-ui/react";
import { DocumentItem } from "../../libraryComponents/interfaces";
import DownLoad from "../../libraryComponents/tabPanelitems/item/download/DownLoad";
import Image from "next/image";

type Props = {
  document: DocumentItem;
};
function LibraryItem({ document }: Props) {
  return (
    <Box bg="brand.bgItemFile" height="292px" borderRadius="12px">
      <Stack p={"12px 12px"} spacing="32px">
        <Box
          boxSize={"56px"}
          borderRadius="100%"
          border={"2px"}
          borderColor="text"
          bg="white"
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image src="/pdf.png" alt="" width={25} height={25} priority />
        </Box>
        <Text variant="text20" className="text-3-line">
          {document.shortDesc}
        </Text>
        <Box>
          <DownLoad docItem={document} />
        </Box>
      </Stack>
    </Box>
  );
}

export { LibraryItem };
