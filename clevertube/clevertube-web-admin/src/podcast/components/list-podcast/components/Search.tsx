import { memo, useEffect, useState } from "react";
import { Button, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { SearchType } from "../../../interface";
import { setSearch } from "../../../reducer/podcast.reducer";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { useAppSelector } from "src/common/hooks/useAppSelector";

const Search = ({
  instanceTable,
  instanceMultiple,
  instanceGetAllPodcasts,
}: SearchType) => {
  const [dataInput, setDataInput] = useState<string>("");

  const dispatch = useAppDispatch();
  const searchRedux = useAppSelector((state) => state.podcast.search);

  const { setGlobalFilter } = instanceTable;
  const { isFetching } = instanceGetAllPodcasts;
  const { handleCheckAll } = instanceMultiple;

  const handleSearch = () => {
    dispatch(setSearch(dataInput || ""));
    setGlobalFilter(dataInput);
  };

  const handleReset = () => {
    if (dataInput) {
      dispatch(setSearch(""));
      setGlobalFilter("");
      setDataInput("");
      handleCheckAll(false);
    }
  };

  useEffect(() => {
    if (dataInput.length === 0) {
      dispatch(setSearch(""));
      setGlobalFilter("");
      setDataInput("");
    } else {
      handleCheckAll(false);
    }
  }, [dataInput]);

  useEffect(() => {
    if (isFetching) {
      dispatch(setSearch(""));
      setGlobalFilter("");
      setDataInput("");
    }
  }, [isFetching]);

  return (
    <InputGroup w={{ sm: "100%", md: "100%", lg: "566px" }}>
      <Input
        {...InputStyle}
        placeholder="Search"
        _placeholder={{ color: "gray.text" }}
        _focus={{ borderColor: "color.primary" }}
        border="1px"
        pr="140px"
        borderColor="border.primary"
        value={dataInput}
        onChange={(e) => setDataInput(e.target.value)}
      />
      <InputRightElement {...InputStyle} w={{ sm: "130px", md: "120px" }}>
        <Button
          {...InputStyle}
          w="100%"
          bgColor="color.primary"
          _hover={{ bg: "hover.primary" }}
          onClick={dataInput && searchRedux === dataInput ? handleReset : handleSearch}
          isDisabled={!dataInput}
        >
          <Text fontSize="18px" lineHeight="28px" color="text.secondary">
            {dataInput && searchRedux === dataInput ? "Reset" : "Search"}
          </Text>
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
export default memo(Search);

const InputStyle = {
  height: "48px",
};
