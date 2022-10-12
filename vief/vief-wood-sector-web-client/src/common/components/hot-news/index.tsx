import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useViefRouter } from "@/common/hooks/useViefRouter";
import { replacePathParams } from "../../lib/common.lib";
import {
  ROUTE_ARTICLE_DETAIL,
  ROUTE_ENTERPRISE_ARTICLE_DETAIL,
} from "../../constants/routes.constant";
import { Article } from "../../interfaces/common.interface";

type HotNewsProps = {
  articles: Article[];
  label: string;
};
function HotNews({ articles, label }: HotNewsProps) {
  const router = useViefRouter();

  function handleRedirect(slug: string) {
    router.push(
      replacePathParams(ROUTE_ARTICLE_DETAIL["en"], {
        slug,
      })
    );
  }
  return (
    <VStack spacing="32px">
      <Text variant="text28">{label}</Text>
      {articles.map(({ createdAt, title, thumbnail, slug }, index) => {
        return (
          <HStack
            w="full"
            key={index}
            alignItems="start"
            h={{
              base: "102px",
              sm: "81px",
            }}
            cursor="pointer"
            onClick={() => handleRedirect(slug)}
          >
            <Image
              src={thumbnail.url}
              alt=""
              w={{
                base: "136px",
                sm: "108px",
              }}
              h="full"
              borderRadius="6px"
              objectFit="cover"
            />

            <VStack h="full" justifyContent="space-between" alignItems="start">
              <Text
                variant={{
                  base: "text20",
                  sm: "text16",
                }}
                className="text-2-line"
              >
                {title}
              </Text>
              <Text variant="text14">{createdAt}</Text>
            </VStack>
          </HStack>
        );
      })}
    </VStack>
  );
}

export { HotNews };
