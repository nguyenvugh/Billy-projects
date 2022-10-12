import { GridItem, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { DocumentItem } from "../../libraryComponents/interfaces";
import { LibraryItem } from "./LibraryItem";

type Props = {
  documents: DocumentItem[];
};
const SectionLibrary = ({ documents }: Props) => {
  return (
    <>
      <Stack spacing="32px">
        <Stack spacing="16px">
          <Stack>
            <Text
              variant={{ md: "text20", sm: "text16" }}
              borderBottom={"solid 1.5px"}
              width="fit-content"
              _hover={{ textDecoration: "none" }}
            >
              Thư viện
            </Text>
          </Stack>
          <Text variant={{ md: "text36", sm: "text28" }}>Báo cáo về biến đổi khí hậu</Text>
        </Stack>
        <SimpleGrid columns={{ md: 2, sm: 1 }} spacing={"32px"}>
          {documents.map((doc, index) => {
            return (
              <GridItem key={index}>
                <LibraryItem document={doc} />
              </GridItem>
            );
          })}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default SectionLibrary;
