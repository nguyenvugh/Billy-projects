import { Input, InputGroup } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { SearchType } from "../../interfaces/common.interfaces";

const Search = ({
  instanceTable,
  instanceMultiple,
  instanceGetAll,
  setSearch,
}: SearchType) => {
  const [dataInput, setDataInput] = useState<string>("");

  const dispatch = useAppDispatch();

  const { setGlobalFilter } = instanceTable;
  const { isFetching } = instanceGetAll;
  const { handleCheckAll } = instanceMultiple;

  const handleSearch = (value) => {
    setDataInput(value);
    dispatch(setSearch(value || ""));
    setGlobalFilter(value);
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
        onChange={(e) => handleSearch(e.target.value)}
      />
    </InputGroup>
  );
};
export default memo(Search);

const InputStyle = {
  height: "48px",
};
