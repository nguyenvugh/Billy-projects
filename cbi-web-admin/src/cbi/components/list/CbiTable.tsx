import {
  Center,
  Flex,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteCbi, useDeleteMultipleCbis } from "src/cbi/hooks/useDeleteCbi";
import { useGetCbis } from "src/cbi/hooks/useGetCbis";
import { useUpdateCbi } from "src/cbi/hooks/useUpdateCbi";
import { CBIS, CbiResponse } from "src/cbi/interfaces";
// import { ReactComponent as EditIcon } from "src/common/assets/icons/iconEditV2.svg";
// import { ReactComponent as TrashIcon } from "src/common/assets/icons/iconTrash.svg";
import { ConfirmModalV2 } from "src/common/components/confirm-modal/ConfirmModalV2";
import { LoadingPage } from "src/common/components/loading-page";
// import { Pagination } from "src/common/components/pagination/inedx";
import { DATE_TIME_FORMAT, PAGE_SIZE } from "src/common/constants/common.constant";
import { ROUTE_QUESTIONS_DETAILS } from "src/common/constants/routes.constants";
import { useSelectMultiple } from "src/common/hooks/useSelectMultiple";
import { useToast } from "src/common/hooks/useToast";
import { replacePathParams } from "src/common/lib/common.lib";
import { CbiModal } from "./CbiModal";

interface CbiTableProps {
  numSubmit: number;
  setNumSubmit: (num: number) => void;
  setDelEnabled: (delEnabled: boolean) => void;
}

function CbiTable(props: CbiTableProps) {
  const { setNumSubmit, numSubmit, setDelEnabled } = props;
  const toast = useToast();
  const negative = useNavigate();
  const {
    isOpen,
    //  onOpen,
    onClose,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    // onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const [
    page,
    //  setPage
  ] = useState(1);
  const [
    selectedCbi,
    //  setSelectedCbi
  ] = useState<(CBIS & { img: string }) | null>(null);
  const [
    selectedCbiId,
    //  setSelectedCbiId
  ] = useState("");
  const { mutate: mutateDeleteCbi } = useDeleteCbi();
  const deleteMultipleCbis = useDeleteMultipleCbis();
  const { mutate } = useUpdateCbi();

  const {
    cbis,
    //  hasCbis, totalPage,
    allCurrentId,
    isLoading,
  } = useGetCbis({
    page,
    limit: PAGE_SIZE,
  });
  const {
    isCheckedAll,
    selectedIds,
    //  handleCheckAll,
    // handleSelectItem
  } = useSelectMultiple(allCurrentId, page);

  useEffect(() => {
    if (isCheckedAll || selectedIds.length > 0) {
      setDelEnabled(true);
    } else {
      setDelEnabled(false);
    }
  }, [isCheckedAll, selectedIds]);

  useEffect(() => {
    if (numSubmit > 0) {
      if (selectedIds.length === 1) {
        mutateDeleteCbi(selectedIds[0]);
      } else {
        deleteMultipleCbis.mutate({
          ids: selectedIds,
        });
      }

      setNumSubmit(0);
      setDelEnabled(false);
    }
  }, [numSubmit]);

  function redirectToCbiDetail(cbi: CbiResponse) {
    negative(replacePathParams(ROUTE_QUESTIONS_DETAILS, { questionId: cbi.id }), {
      state: {
        groupName: cbi.name,
      },
    });
  }

  function handleEditCbi(data) {
    if (!data.thumbnail_id) {
      toast({ title: "Xin h??y ch???n ???nh!", status: "error" });
      return;
    }
    mutate({ id: selectedCbi?.id!!, cbi: data });
    onClose();
  }

  // function handleSelecteDeleteCbi(cbiId: string) {
  //   setSelectedCbiId(cbiId);
  //   onOpenDelete();
  // }

  function handleDeleteCbi() {
    mutateDeleteCbi(selectedCbiId);
    onCloseDelete();
  }
  return (
    <LoadingPage isLoading={isLoading}>
      <>
        <Table>
          <Thead
            bg="#EBEFF2"
            sx={{
              th: {
                fontSize: "14px",
                fontWeight: "bold",
                color: "#2D3748",
              },
            }}
          >
            <Tr>
              {/* <Th>
                {hasCbis && (
                  <Checkbox
                    isChecked={isCheckedAll}
                    onChange={(e) => handleCheckAll(e.target.checked)}
                  />
                )}
              </Th> */}
              <Th>T??n b???ng c??u h???i</Th>
              <Th>
                <Center>S??? l?????ng giai ??o???n</Center>
              </Th>
              <Th>
                <Center>C???p nh???t m???i nh???t</Center>
              </Th>
              <Th>Ng?????i t???o</Th>
              {/* <Th>
                <Center>H??nh ?????ng</Center>
              </Th> */}
            </Tr>
          </Thead>

          <Tbody>
            {cbis.map((cbi) => (
              <Tr key={cbi.id}>
                {/* <Td style={{ verticalAlign: "top" }}>
                  <Checkbox
                    isChecked={selectedIds.includes(cbi.id)}
                    onChange={(e) => handleSelectItem(cbi.id, e.target.checked)}
                  />
                </Td> */}
                <Td onClick={() => redirectToCbiDetail(cbi)}>
                  <Flex>
                    <Image
                      src={cbi.thumbnail.url}
                      w="150px"
                      h="88px"
                      objectFit="cover"
                      borderRadius="4px"
                    />
                    <Text color="#007BFF" fontSize="14px" ml="3">
                      {cbi.name}
                    </Text>
                  </Flex>
                </Td>
                <Td onClick={() => redirectToCbiDetail(cbi)} style={{ verticalAlign: "top" }}>
                  <Center>
                    {cbi.total_levels < 10 ? `0${cbi.total_levels}` : `${cbi.total_levels}`}
                  </Center>
                </Td>
                <Td onClick={() => redirectToCbiDetail(cbi)} style={{ verticalAlign: "top" }}>
                  <Center>{dayjs(cbi.created_at).format(DATE_TIME_FORMAT)}</Center>
                </Td>
                <Td onClick={() => redirectToCbiDetail(cbi)} style={{ verticalAlign: "top" }}>
                  {" "}
                  {cbi.created_by?.name}
                </Td>
                {/* <Td style={{ verticalAlign: "top" }}>
                  <Center>
                    <Flex>
                      <EditIcon
                        fill="#718096"
                        cursor="pointer"
                        onClick={() => {
                          setSelectedCbi({
                            id: cbi.id,
                            name: cbi.name,
                            thumbnail_id: cbi.thumbnail.id,
                            img: cbi.thumbnail.url,
                            description: cbi.description,
                          });
                          onOpen();
                        }}
                      />
                      <Box ml="4">
                        <TrashIcon
                          cursor="pointer"
                          onClick={() => handleSelecteDeleteCbi(cbi.id)}
                        />
                      </Box>
                    </Flex>
                  </Center>
                </Td> */}
              </Tr>
            ))}
          </Tbody>
          <CbiModal
            selectedCbi={selectedCbi}
            title="Ch???nh s???a b???ng c??u h???i"
            isOpen={isOpen}
            onClose={onClose}
            onSave={handleEditCbi}
          />
        </Table>

        <ConfirmModalV2
          isOpen={isOpenDelete}
          title="Th??ng b??o"
          content="B???n c?? ch???c ch???n mu???n x??a b???ng c??u h???i n??y ?"
          cancelText="Tho??t"
          okText="?????ng ??"
          onOk={handleDeleteCbi}
          onClose={onCloseDelete}
          onCancel={onCloseDelete}
        />

        {/* {hasCbis && (
          <Flex mt={"48px"} justifyContent="flex-end">
            <Pagination
              currentPage={page}
              totalPages={totalPage}
              onPageChange={(page) => setPage(page)}
            />
          </Flex>
        )} */}
      </>
    </LoadingPage>
  );
}

export { CbiTable };
