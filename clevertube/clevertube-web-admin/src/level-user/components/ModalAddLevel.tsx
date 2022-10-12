import { useEffect, useState } from "react";
import { DataType, ModalAddLevelType } from "../interface";
import { useAddLevel } from "../hooks/useAddLevel";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddLevel } from "../schemas/AddLevel.schema";
import { ErrorMess } from "src/common/components/error-message/ErrorMessage";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";

const ModalAddLevel = ({
  isOpenAddLevel,
  onCloseAddLevel,
  instanceGetAllLevels,
  instanceMultiple,
}: ModalAddLevelType) => {
  const initialState = { key: "", name: "", description: "", enabled: "1", lang: "en" };

  const [state, setState] = useState<DataType>(initialState);

  const {
    handleSubmit,
    register,
    reset: resetForm,
    formState: { errors },
  } = useForm<DataType>({
    resolver: yupResolver(AddLevel),
  });

  const { reset } = instanceMultiple;
  const { refetch } = instanceGetAllLevels;
  const { mutate } = useAddLevel(refetch);

  const onSubmit = () => {
    reset();
    mutate(state);
    resetForm(initialState);
    setState(initialState);
    onCloseAddLevel();
  };

  const handleCloseModal = () => {
    reset();
    resetForm(initialState);
    setState(initialState);
    onCloseAddLevel();
  };

  useEffect(() => {
    if (state.enabled === "-1") {
      setState({ ...state, enabled: -1 });
    }
    if (state.enabled === "1") {
      setState({ ...state, enabled: +state.enabled });
    }
  }, [state.enabled]);

  return (
    <Modal
      isCentered
      scrollBehavior="inside"
      isOpen={isOpenAddLevel}
      onClose={handleCloseModal}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent maxW={{ sm: "400px", md: "450px", lg: "500px" }}>
          <ModalHeader color="text.primary">Create Level</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color="text.primary">Level Key</FormLabel>
              <Input
                {...register("key")}
                type="text"
                placeholder="Enter level key"
                value={state.key}
                onChange={({ target: { value } }) => setState({ ...state, key: value })}
              />
              {errors.key && <ErrorMess mt={"5px"} error={errors.key.message} />}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="text.primary">Level Name</FormLabel>
              <Input
                {...register("name")}
                type="text"
                placeholder="Enter level name"
                value={state.name}
                onChange={({ target: { value } }) => setState({ ...state, name: value })}
              />
              {errors.name && <ErrorMess mt={"5px"} error={errors.name.message} />}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="text.primary">Description</FormLabel>
              <Textarea
                {...register("description")}
                resize="none"
                value={state.description}
                onChange={({ target: { value } }) =>
                  setState({ ...state, description: value })
                }
                placeholder="Enter level description"
                size="sm"
              />
              {errors.description && (
                <ErrorMess mt={"5px"} error={errors.description.message} />
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="text.primary">Enabled</FormLabel>
              <RadioGroup
                defaultValue="1"
                onChange={(e) => setState({ ...state, enabled: e })}
              >
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="red" value="-1">
                    Unable
                  </Radio>
                  <Radio colorScheme="green" value="1">
                    Enable
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="text.primary">Language</FormLabel>
              <Select
                {...register("lang")}
                placeholder="Select language"
                defaultValue={state.lang}
                onChange={(e) => setState({ ...state, lang: e.target.value })}
              >
                <option value="vi">Vi</option>
                <option value="en">En</option>
              </Select>
              {errors.lang && <ErrorMess mt={"5px"} error={errors.lang.message} />}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              bg="color.primary"
              _hover={{ bg: "hover.primary" }}
              color="text.secondary"
              mr={3}
            >
              Create
            </Button>
            <Button color="text.primary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default ModalAddLevel;
