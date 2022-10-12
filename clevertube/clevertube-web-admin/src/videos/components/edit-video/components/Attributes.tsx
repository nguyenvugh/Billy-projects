import Select from "react-select";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTER } from "src/common/constants/routes.constants";

import { Box, Button, Checkbox, Input, Text, Textarea, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ErrorMess } from "src/common/components/error-message/ErrorMessage";
import { useAppSelector } from "src/common/hooks/useAppSelector";
import { useGetAllLevels } from "src/level-user/hooks/useGetAllLevels";
import { useGetAllTopics } from "src/topic/hooks/useGetAllTopics";

import { AttributeTypeEdit } from "../../../interface";

import { useEditAttributes } from "src/videos/hooks/useEditAttributes";
import { EditAttributesVideo } from "src/videos/schemas/EditVideo.schema";
import { INITIAL_STATE_ATTRIBUTES } from "../../../constant";

const Attribute = ({ attributes }: any) => {
  const { title, feature, description, level, topics, highlightWords, videoID } =
    attributes;
  const [state, setState] = useState<AttributeTypeEdit>(INITIAL_STATE_ATTRIBUTES);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<AttributeTypeEdit>({
    resolver: yupResolver(EditAttributesVideo),
  });

  const {
    mutate: mutateEditAttributes,
    isSuccess: successEditAttributes,
    isError: errorEditAttributes,
    error,
  } = useEditAttributes();

  useEffect(() => {
    if (successEditAttributes) {
      setLoading(false);
      navigate(ROUTER.VIDEO_PAGE);
    }
  }, [successEditAttributes]);
  useEffect(() => {
    if (errorEditAttributes && error) {
      const title = error as {
        data: any;
      };
      setLoading(false);
      toast({
        title: title?.data?.message[0],
        status: "error",
        duration: 1000,
      });
    }
  }, [errorEditAttributes]);

  const onSubmitAttributes = () => {
    setLoading(true);
    mutateEditAttributes({
      ...state,
      highlightWords,
      videoId: +videoID,
    });
  };
  useEffect(() => {
    setState({
      name: title,
      desc: description,
      topicKeys: topics,
      levelKey: level,
      isFeature: feature,
    });
    setValue("name", title);
    setValue("desc", description);
    setValue("isFeature", feature);
    setValue("levelKey", level);
    setValue("topicKeys", topics);
  }, [JSON.stringify(attributes)]);

  const maxLength = {
    audioCode: 10,
    title: 100,
    desc: 200,
  };

  const levelKeyRef: any = useRef();
  const topicKeysRef: any = useRef();

  const pageTopicRedux = useAppSelector((state) => state.topic.page);
  const limitTopicRedux = useAppSelector((state) => state.topic.limit);

  const { data: dtTopics } = useGetAllTopics(pageTopicRedux, limitTopicRedux);
  const { data: dtLevels } = useGetAllLevels();

  const mapDtTopics = dtTopics?.data;
  const mapDtLevels = dtLevels?.data;

  const topicOptions = mapDtTopics?.items
    ?.map((item) => {
      return item?.translates?.map((item) => ({
        value: item?.topicKey,
        label: item?.name,
      }));
    })
    .flat(1);

  const levelOptions = mapDtLevels?.items
    ?.map((item) => {
      return item?.translates?.map((item) => ({
        value: item?.levelKey,
        label: item?.name,
      }));
    })
    .flat(1);

  const levelValue = levelOptions?.filter((item) => {
    if (item.value === state.levelKey) return item;
    return null;
  });

  const topicValues = topicOptions
    ?.filter((item) => {
      if (state.topicKeys.includes(item.value)) return item;
      return null;
    })
    .flat(1);

  return (
    <form onSubmit={handleSubmit(onSubmitAttributes)}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        columnGap="50px"
        mb="30px"
      >
        <Box w="70%" display="flex" flexDirection="column" rowGap="30px">
          <Text fontWeight="600" fontSize="20px">
            Attributes
          </Text>

          <Box display="flex" justifyContent="space-between" w="100%" columnGap="40px">
            <Text w="20%" mt="10px">
              Title
            </Text>
            <Box w="80%">
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    spellCheck="false"
                    type="text"
                    placeholder="Enter podcast title"
                    maxLength={maxLength.title}
                    value={state.name}
                    onChange={(e) => {
                      onChange(e.target.value);
                      setState({ ...state, name: e.target.value });
                    }}
                  />
                )}
              />
              <Box mt="12px" position="relative" display="flex" alignItems="center">
                <ErrorMess error={errors.name?.message} />
                <Text position="absolute" right="0" color="#999999" fontSize="14px">
                  {state.name.length}/{maxLength.title}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            w="100%"
            columnGap="40px"
            alignItems="center"
          >
            <Text w="20%">Feature</Text>
            <Box w="80%">
              <Controller
                name="isFeature"
                control={control}
                render={({ field: { onChange } }) => (
                  <Checkbox
                    isChecked={state.isFeature}
                    onChange={(e) => {
                      onChange(e.target.checked);
                      setState({ ...state, isFeature: e.target.checked });
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between" w="100%" columnGap="40px">
            <Text w="20%" mt="10px">
              Description
            </Text>
            <Box w="80%">
              <Controller
                name="desc"
                control={control}
                render={({ field: { onChange } }) => (
                  <Textarea
                    spellCheck="false"
                    borderRadius="5px"
                    resize="none"
                    value={state.desc}
                    maxLength={maxLength.desc}
                    onChange={(e) => {
                      onChange(e.target.value);
                      setState({ ...state, desc: e.target.value });
                    }}
                    placeholder="Enter podcast description"
                    size="sm"
                  />
                )}
              />
              <Box mt="12px" position="relative" display="flex" alignItems="center">
                <ErrorMess error={errors.desc?.message} />
                <Text position="absolute" right="0" color="#999999" fontSize="14px">
                  {state.desc.length}/{maxLength.desc}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between" w="100%" columnGap="40px">
            <Text w="20%" mt="10px">
              Level
            </Text>
            <Box w="80%">
              <Controller
                name="levelKey"
                control={control}
                render={({ field: { onChange } }) => (
                  <Select
                    ref={levelKeyRef}
                    placeholder="Choose the level"
                    options={levelOptions}
                    value={levelValue}
                    onChange={(e) => {
                      onChange(e);
                      setState({ ...state, levelKey: e.value });
                    }}
                  />
                )}
              />
              <Box mt="12px" position="relative" display="flex" alignItems="center">
                <ErrorMess error={errors.levelKey?.message} />
              </Box>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between" w="100%" columnGap="40px">
            <Text w="20%" mt="10px">
              Topics
            </Text>
            <Box w="80%">
              <Controller
                name="topicKeys"
                control={control}
                render={({ field: { onChange } }) => (
                  <Select
                    isMulti
                    ref={topicKeysRef}
                    placeholder="Choose the topics"
                    options={topicOptions}
                    value={topicValues}
                    onChange={(e) => {
                      onChange(e);
                      setState({ ...state, topicKeys: e.map((item) => item?.value) });
                    }}
                  />
                )}
              />
              <Box mt="12px" position="relative" display="flex" alignItems="center">
                <ErrorMess error={errors.topicKeys?.message} />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          w="30%"
          columnGap="20px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link style={{ width: "100%" }} to={ROUTER.VIDEO_PAGE}>
            <Button
              w="100%"
              bg="#fff"
              color="#216BCD"
              fontSize="14px"
              border="1px solid #216BCD"
            >
              Cancel
            </Button>
          </Link>
          <Button
            w="100%"
            type="submit"
            bg="color.primary"
            _hover={{ bg: "hover.primary" }}
            color="text.secondary"
            fontSize="14px"
            isLoading={isLoading}
            loadingText="Update"
            spinnerPlacement="start"
            disabled={isLoading}
          >
            Update Attributes
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default Attribute;
