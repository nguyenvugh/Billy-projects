import { useEffect, useState } from "react";
import { DataType, ModalEditLevelType } from "../interface";
import { useEditLevel } from "../hooks/useEditLevel";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditLevel } from "../schemas/EditLevel.schema";
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

const ModalEditLevel = ({
  isOpenEditLevel,
  onCloseEditLevel,
  instanceGetLevel,
  instanceGetAllLevels,
  instanceMultiple,
}: ModalEditLevelType) => {
  const [state, setState] = useState<DataType>({
    key: "",
    name: "",
    description: "",
    enabled: "",
    lang: "",
  });

  const {
    handleSubmit,
    register,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<DataType>({
    resolver: yupResolver(EditLevel),
  });

  const { reset } = instanceMultiple;
  const { refetch } = instanceGetAllLevels;
  const { mutate } = useEditLevel(refetch);

  const { data: dt, isLoading } = instanceGetLevel;

  const getData = dt?.data;
  const getDataTranslates = getData?.translates;

  const key = getData?.key;
  const description = getData?.description;
  const enabled = getData?.enabled;
  const name = getDataTranslates?.map((item) => item.name).toString();
  const lang = getDataTranslates?.map((item) => item.lang).toString();

  const inputData = {
    key: state.key === undefined ? key : state.key,
    name: state.name === undefined ? name : state.name,
    description: state.description === undefined ? description : state.description,
    enabled: state.enabled === undefined ? enabled : state.enabled,
    lang: state.lang === undefined ? lang : state.lang,
  };

  const handleCloseModal = () => {
    reset();
    resetField("name");
    resetField("description");
    onCloseEditLevel();
  };

  const onSubmit = () => {
    handleCloseModal();
    mutate([key, inputData]);
  };

  useEffect(() => {
    if (inputData) {
      setValue("name", inputData.name);
      setValue("description", inputData.description);
      setValue("lang", inputData.lang);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setState({
        key,
        name,
        description,
        enabled,
        lang,
      });
    }
  }, [isLoading]);

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
      isOpen={isOpenEditLevel}
      onClose={handleCloseModal}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent maxW={{ sm: "400px", md: "450px", lg: "500px" }}>
          <ModalHeader color="text.primary">Edit Level</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel color="text.primary">Level Name</FormLabel>
              <Input
                {...register("name")}
                type="text"
                placeholder="Enter level name"
                value={inputData.name}
                onChange={({ target: { value } }) => setState({ ...state, name: value })}
              />
              {errors.name && <ErrorMess mt={"5px"} error={errors.name.message} />}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="text.primary">Description</FormLabel>
              <Textarea
                {...register("description")}
                resize="none"
                value={inputData.description}
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
                defaultValue={inputData.enabled?.toString()}
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
                onChange={(e) => setState({ ...state, lang: e.target.value })}
              >
                <option value="vi" selected={inputData.lang === "vi"}>
                  Vi
                </option>
                <option selected={inputData.lang === "en"} value="en">
                  En
                </option>
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
              Save
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

export default ModalEditLevel;
