import { useEffect, useState } from "react";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useImmer } from "use-immer";
import { useForm } from "react-hook-form";
import { IoIosArrowForward } from "react-icons/io";
import { EditPassword } from "./EditPassword";
import { useFetchDataUser } from "../hooks/useFetchDataUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { presignUrl } from "src/common/lib/files.lib";
import { AvatarUpload } from "../upload-avatar/AvatarUpload";
import { profileSchema } from "../profile.schema";
import { ErrorMess } from "src/common/components/error-message-form";

const FormInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    // trigger,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(profileSchema),
  });
  const { data } = useFetchDataUser();
  const [phoneNumber, setPhoneNumber] = useState("");
  const INPUT_LINE_ONE = [
    { text: "Tên tài khoản", value: data?.data.userDocument },
    { text: "Nhóm admin", value: data?.data.fullName },
  ];
  const [editInfo, setEditInfo] = useImmer(false);
  const styled = {
    marginLeft: "15px",
  };
  const [extraDataForm, setExtraDataForm] = useState<any>({});
  async function handleFileChange(file?: File) {
    let thumbnailId;
    if (file) {
      const thumbRes: any = await presignUrl(file);
      thumbnailId = thumbRes.id;
    }
    setExtraDataForm({ ...extraDataForm, thumbnailId });
  }
  useEffect(() => {
    setPhoneNumber(data?.data.phoneNumber);
  }, [data]);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box ml="-35px" w={1200} bg="white" paddingBottom="50px">
        <Flex align="flex-end">
          <Flex w="400px" align="flex-end">
            <Text fontSize="18px" fontWeight="bold" mt="31px" ml="24px">
              Thông tin cá nhân
            </Text>
            {editInfo && (
              <Flex align="center">
                <IoIosArrowForward style={styled} />
                <Text ml="19.33px" fontSize="18px" fontWeight="600">
                  Chỉnh sửa
                </Text>
              </Flex>
            )}
          </Flex>
          <Button
            ml="600px"
            w="119px"
            bg="green.primary"
            color="white"
            border="2px solid #CBCBCB"
            display={editInfo ? "none" : "block"}
            onClick={() => setEditInfo(!editInfo)}
          >
            Chỉnh sửa
          </Button>
        </Flex>

        <Box mt="70px" ml="24px">
          <Flex>
            <Box>
              <Flex>
                {INPUT_LINE_ONE.map((element, index) => {
                  return (
                    <Box ml="24px" key={index}>
                      <Text>{element.text}</Text>
                      <Input value={element.value} isDisabled {...INPUT_STYLE} />
                    </Box>
                  );
                })}
              </Flex>

              <Flex mt="30px">
                <Box ml="24px">
                  <Text>Họ và tên</Text>
                  <Input disabled value={data?.data?.fullName} {...INPUT_STYLE} />
                </Box>
                <Box ml="24px">
                  <Text>Số điện thoại</Text>
                  <Input
                    type="text"
                    id="phoneNumber"
                    {...register("phoneNumber")}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      // await trigger("phoneNumber");
                      if (phoneNumber) {
                        clearErrors("phoneNumber");
                      }
                    }}
                    isDisabled={!editInfo}
                    value={phoneNumber}
                    {...INPUT_STYLE}
                  />
                  <Text color={"#E53E3E"}>
                    <ErrorMess error={errors.phoneNumber && errors.phoneNumber?.message} />
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box>
              <AvatarUpload
                marginLeft="60px"
                mt="-10px"
                h="270px"
                w="270px"
                borderRadius="5px"
                editInfo={editInfo}
                onChange={handleFileChange}
                data={data}
              />
            </Box>
          </Flex>

          <EditPassword
            editInfo={editInfo}
            phoneNumber={phoneNumber}
            register={register}
            setEditInfo={setEditInfo}
            clearErrors={clearErrors}
            errors={errors}
            data={data}
            extraDataForm={extraDataForm}
          />
        </Box>
      </Box>
    </form>
  );
};

const INPUT_STYLE = {
  w: "382px",
  h: "40px",
};
export { FormInfo };
