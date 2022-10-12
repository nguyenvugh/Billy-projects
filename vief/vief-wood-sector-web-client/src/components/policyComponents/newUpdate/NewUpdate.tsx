import { Stack, Text, VStack } from "@chakra-ui/react";
import { PolicyPageProps } from "../interfaces";
import ArticleSlide from "./articalSlide/ArticleSlide";

const NewUpdate = ({
  latestArticle,
}: Pick<PolicyPageProps, "latestArticle">) => {
  return (
    <>
      <Stack
        alignSelf={"center"}
        spacing={{ md: "64px", sm: "32px" }}
        w={{ sm: "343px", md: "1216px" }}
      >
        <Text variant={{ md: "text28", sm: "text24" }}>Mới cập nhật</Text>
        <ArticleSlide latestArticle={latestArticle} />
      </Stack>
    </>
  );
};

export default NewUpdate;
