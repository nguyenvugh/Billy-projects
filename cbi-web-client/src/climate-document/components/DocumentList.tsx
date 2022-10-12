import Pagination from "@cbi/components/pagination";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Documents as DocumentsI } from "src/climate-document/documents.interface";
import { List } from "src/common/interfaces/common.interface";
import { getDocuments } from "../services";
import DocumentItem from "./DocumentItem";

function DocumentList({ documents }: { documents: List<DocumentsI> }) {
  const listDocuments = documents.results || [];
  const [page, setPage] = useState(1);
  const [listDoc, setListDoc] = useState<DocumentsI[]>(listDocuments);
  const totalPage = documents.totalPage || 0;
  useEffect(() => {
    setListDoc(listDocuments);
    onChangePage(1);
  }, []);

  const onChangePage = async (page: number) => {
    setPage(page);
    try {
      const res = await getDocuments({ page, limit: 8 });
      setListDoc(res.data.results || []);
    } catch (error) {
      console.log(error);
      setListDoc([]);
    }
  };
  return (
    <Box>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns={{
          sm: "repeat(4, 1fr)",
        }}
        gridRowGap={8}
        gridColumnGap={4}
      >
        {listDoc.map((doc) => (
          <GridItem>
            <DocumentItem title={doc.title} fileKey={doc.file.key} />
          </GridItem>
        ))}
      </Grid>
      {!!totalPage && (
        <Pagination
          current={page}
          total={totalPage}
          onChangePage={(page: number) => onChangePage(page)}
          size={8}
          mb="100px"
        />
      )}
    </Box>
  );
}

export { DocumentList };
