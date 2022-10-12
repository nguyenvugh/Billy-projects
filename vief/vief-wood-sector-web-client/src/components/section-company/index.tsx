import { Article } from "@/src/common/interfaces/common.interface";
import { Stack } from "@chakra-ui/react";
import SectionCompanyResearch from "./company-research";
import SectionCompanyStory from "./company-story";

type Props = {
  articles: Article[];
};
export default function SectionCompany({ articles }: Props) {
  return (
    <Stack spacing={{ md: "64px", sm: "48px" }}>
      {articles[0] && <SectionCompanyStory article={articles[0]} />}
      {articles[1] && <SectionCompanyResearch article={articles[1]} />}
    </Stack>
  );
}
