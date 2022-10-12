import { WebContainer } from "@/src/common/components/WebContainer";

import { Stack, Text } from "@chakra-ui/react";
import { LibraryPageProps } from "./interfaces";

import { LibTabPanelItem } from "./tabPanelitems/LibTabPanelItem";

const LibraryPage = ({ listItem, categories }: LibraryPageProps) => {
  return (
    <WebContainer>
      <Stack pt={{ md: "48px", sm: "16px" }} pb={{ md: "64px", sm: "48px" }} spacing={{ md: "64px", sm: "32px" }}>
        <Text borderBottom={"solid 1.5px"} width="fit-content" alignSelf="center" variant="text20">
          Thư viện
        </Text>
        <LibTabPanelItem listItem={listItem} categories={categories} />
      </Stack>
    </WebContainer>
  );
};

export default LibraryPage;
