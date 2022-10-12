import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "src/common/components/form";
import { PHASE_SCHEMA } from "../cbi.schema";
type CbiModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  name?: string;
  autoScore?: boolean;
};
function PhaseModal({ title, isOpen, onClose, onSave, name, autoScore }: CbiModalProps) {
  const formMethods = useForm({
    resolver: yupResolver(PHASE_SCHEMA),
    defaultValues: {
      name,
      autoScore,
    },
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mt="40">
        <ModalHeader fontWeight="600" fontSize="18px">
          {title}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Form methodsHookForm={formMethods}>
            <Form.Item name="name" label="Nhập tên giai đoạn" isRequired>
              <Textarea minHeight="220px" />
            </Form.Item>
            <Form.Item name="autoScore">
              <Checkbox>Chấm điểm tự động</Checkbox>
            </Form.Item>
          </Form>
        </ModalBody>

        <ModalFooter justifyContent="flex-end" pt="0">
          <Stack direction="row" spacing={4} justifyContent="center">
            <Button bg="#718096" w="140px" onClick={onClose}>
              Hủy bỏ
            </Button>
            <Button
              bg="green.primary"
              w="140px"
              onClick={formMethods.handleSubmit((data) => {
                console.log(data);
                onSave && onSave();
              })}
            >
              Lưu
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { PhaseModal };
