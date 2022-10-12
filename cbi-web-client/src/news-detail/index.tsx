import Container from "@cbi/components/container";
import NewsHot from "@cbi/components/news/NewsHot";
import { PostDetailProps } from "@cbi/services/article/article.interface";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import NewsDetail from "./components/NewDetail";

function PostDetail({ detailArticle, hotnewArticle }: PostDetailProps) {
  const router = useRouter();
  const title = detailArticle?.translates?.[0]?.title;
  const cateTitle = detailArticle?.articleCategory?.translates?.[0].name;
  const cateId = detailArticle?.articleCategory?.id;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="CEBI-web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Breadcrumb pt={{ base: "25px", md: "33px" }} color="#2D3748">
            <BreadcrumbItem>
              <Link href="/article" passHref shallow>
                <BreadcrumbLink>Tin tức - Sự kiện</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href={`/news?categoryId=${cateId}`} passHref shallow>
                <BreadcrumbLink>{cateTitle}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage fontWeight={"bold"}>
              <Text>Chi tiết bài viết</Text>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box mt={6} mb={6}>
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 285px" }}
              gap={{ base: "32px", md: "64px" }}
            >
              <Box>
                <NewsDetail detailArticle={detailArticle} />
              </Box>
              <Box>
                <NewsHot hotnewArticle={hotnewArticle} />
              </Box>
            </Grid>
          </Box>
        </Container>
      </main>
    </div>
  );
}
export default PostDetail;
