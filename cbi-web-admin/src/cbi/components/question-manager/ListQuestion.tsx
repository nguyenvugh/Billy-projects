import { Stack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDetailQuizLevel } from "src/cbi/hooks/useDetailQuizLevel";
import { useEditQuizGroup } from "src/cbi/hooks/useEditQuizGroup";
import { QuizGroupParam } from "src/cbi/interfaces";
// import { ReactComponent as PlusIcon } from "src/common/assets/icons/iconPlus.svg";
// import { ReactComponent as PublishIcon } from "src/common/assets/icons/iconPublish.svg";
import { ConfirmModalV2 } from "src/common/components/confirm-modal/ConfirmModalV2";
import { useToast } from "src/common/hooks/useToast";
import { CbiModal } from "./CbiModal";
import QuizCategoryItem from "./QuizCategoryItem";

interface LocationState {
  groupName: string;
  levelName: string;
  auto_calculate_score: number;
}

function ListQuestion() {
  const search = useParams();
  const location = useLocation();
  const toast = useToast();
  const state = location.state as LocationState;
  const { data } = useDetailQuizLevel(search?.questionId || "", search?.level || "");
  const { results } = data?.data || { results: [] };
  const {
    isOpen,
    // onOpen,
    onClose,
  } = useDisclosure();
  const {
    isOpen: isOpenPublish,
    //  onOpen: onOpenPublish,
    onClose: onClosePublish,
  } = useDisclosure();
  const editQuizGroup = useEditQuizGroup();

  const onPublish = () => {
    const mutatedQuizGroupParams: QuizGroupParam = {
      name: state.levelName,
      auto_calculate_score: state.auto_calculate_score,
      status_publish: 1,
    };
    editQuizGroup.mutate(
      {
        id: search?.questionId || "",
        level_id: search?.level || "",
        quizGroupParams: mutatedQuizGroupParams,
      },
      {
        onSuccess: () => {
          onClosePublish();
          editQuizGroup.invalidate();
          toast({
            position: "top",
            title: "Xuất bản thành công!",
          });
        },
        onError: (err: any) => {
          onClosePublish();
          toast({
            position: "top",
            title: err.data?.message,
            status: "error",
          });
        },
      },
    );
  };

  return (
    <VStack w="full" spacing="5">
      <Text
        fontSize="24px"
        variant="page-title"
        py="27px"
        borderBottom="2px solid #EEEEEE"
        w="full"
      >
        {`${state.levelName} - ${state.groupName}`}
      </Text>

      <Stack direction="row" justifyContent="space-between" alignItems="center" w="full">
        <Text variant="page-title" fontSize="24px">
          Danh sách câu hỏi
        </Text>

        {/* <Stack direction="row" spacing={4}>
          <Button bg="green.primary" leftIcon={<PlusIcon />} onClick={onOpen}>
            Thêm danh mục
          </Button>
          <Button bg="green.primary" leftIcon={<PublishIcon />} onClick={onOpenPublish}>
            Xuất bản câu hỏi
          </Button>
        </Stack> */}
      </Stack>

      {results.length > 0 &&
        results.map((item) => {
          return <QuizCategoryItem quizCategory={item} />;
        })}

      {isOpen && (
        <CbiModal title="Thêm danh mục" onSave={() => {}} isOpen={isOpen} onClose={onClose} />
      )}
      <ConfirmModalV2
        title="Thông báo"
        content="Bạn có chắc chắn muốn xuất bản bảng câu hỏi này?"
        isOpen={isOpenPublish}
        onCancel={onClosePublish}
        onOk={onPublish}
        okText="Đồng ý"
      />
    </VStack>
  );
}

export { ListQuestion };
