import { Pagination } from "@/src/common/components/pagination";
import { toTotalPage } from "@/src/common/lib/common.lib";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { SectionPastProps } from "../interface";
import { getArticleEvent } from "../service";
import SectionContent from "./section-content";

export default function SectionPast({ pastEvents }: SectionPastProps) {
  const [dataEvents, setDataEvents] = useState(pastEvents);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = toTotalPage(pastEvents.total, 6);

  async function handlePageChange(page: number) {
    const newData = await getArticleEvent({ field: "WOOD", page, size: 6, timeline: "TOOK_PLACE" });
    setDataEvents(newData);
    setCurrentPage(page);
  }
  return (
    <Box>
      <Text variant="text28" mt="69px">
        Đã diễn ra
      </Text>
      <Box display="flex" mt="16px" mb="32px">
        <Button variant="primary">Ngành Gỗ</Button>
        <Button ml="30px">Ngành khác</Button>
      </Box>
      <SectionContent pastEvents={dataEvents.data} />
      {dataEvents.data.length > 0 && (
        <HStack w="full" justifyContent="center" mt="32px">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={(page) => handlePageChange(page)}
          />
        </HStack>
      )}
    </Box>
  );
}
