import { Pagination } from "@/src/common/components/pagination";
import { LANG } from "@/src/common/constants/common.constant";
import { useViefRouter } from "@/src/common/hooks/useViefRouter";
import { Lang, ListResponse } from "@/src/common/interfaces/common.interface";
import { toTotalPage } from "@/src/common/lib/common.lib";
import { Box, Grid, GridItem, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import { DOCUMENT_SIZE, getParamSearchDocument } from "../contants";
import { DocumentItem, LibraryPageProps } from "../interfaces";
import { getListDocumentService } from "../services";
import { FileItems } from "./item/FileItems";

export const LibTabPanelItem = ({ listItem, categories }: LibraryPageProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { locale } = useViefRouter();
  const lang = (locale || LANG.vi) as Lang;

  const [listDocumentData, setListDocumentData] = useState<ListResponse<DocumentItem>>(listItem);

  async function handlePageChange(page: number) {
    const listData = await getListDocumentService(getParamSearchDocument({ page, size: DOCUMENT_SIZE, lang }));

    setListDocumentData(listData);
    setCurrentPage(page);
  }

  return (
    <Tabs variant="unstyled" w="full">
      <TabList w="full" justifyContent={"center"}>
        {categories.map((cate, index) => (
          <Tab
            key={cate.id}
            alignSelf="center"
            _selected={{ color: "white", bg: "brand.100" }}
            color="text"
            border={"1px solid #C5CAD3"}
            borderRadius={"6px"}
            fontSize="14px"
            fontWeight="500"
            mr={{ md: "32px", sm: "20px" }}
            py="8px"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {cate.name}
          </Tab>
        ))}
      </TabList>
      <TabPanels padding="0px">
        {categories.map((cate) => (
          <TabPanel key={cate.id} pt="32px">
            <Stack spacing="32px">
              <Grid
                templateColumns={{
                  sm: "repeat(1, 1fr)",
                  base: "repeat(2, 1fr)",
                }}
                gap={{
                  base: 6,
                  sm: 4,
                }}
              >
                {listDocumentData?.data?.map((doc, index) => (
                  <GridItem key={index}>
                    <FileItems docItem={doc} />
                  </GridItem>
                ))}
              </Grid>
              <Box display="flex" justifyContent="center" w="full">
                <Pagination
                  currentPage={currentPage}
                  totalPages={toTotalPage(listDocumentData.total, DOCUMENT_SIZE)}
                  onPageChange={(page) => handlePageChange(page)}
                />
              </Box>
            </Stack>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
