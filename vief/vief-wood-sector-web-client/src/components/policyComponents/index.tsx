import { WebContainer } from "@/src/common/components/WebContainer";
import { Stack, Text } from "@chakra-ui/react";
import { InfoPolicy } from "./inforPolicy/InforPolicy";
import { PolicyPageProps } from "./interfaces";
import NewUpdate from "./newUpdate/NewUpdate";

export const PolicyPage = ({
  articleData,
  categories,
  latestArticle,
}: PolicyPageProps) => {
  return (
    <WebContainer>
      <Stack
        mb={"64px"}
        pt={{ md: "64px", sm: "32px" }}
        spacing={{ md: "64px", sm: "32px" }}
      >
        <Text
          borderBottom={"solid 1.5px"}
          width="fit-content"
          alignSelf="center"
          variant="text20"
        >
          Chính sách
        </Text>

        <NewUpdate latestArticle={latestArticle} />
        <InfoPolicy articleData={articleData} categories={categories} />
      </Stack>
    </WebContainer>
  );
};
