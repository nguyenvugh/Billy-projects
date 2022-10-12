import { useEffect, useState } from "react";
import { Box, Image } from "@chakra-ui/react";

export default function Star({ mode, value, baseSize, mdSize, display, onRate }) {
  const [rate, setRate] = useState(value);
  useEffect(() => {
    setRate(value);
  }, [value]);
  const styles = {
    display: "inline-block",
    boxSize: { base: baseSize, md: mdSize },
    mr: { base: 1, md: 2 },
  };

  const handleClickStar = (id) => {
    if (mode === "edit") {
      setRate(id);
      onRate(id);
    }
  };

  return (
    <Box display={display}>
      <Image
        {...styles}
        src={rate >= 1 ? "/icons/star-yellow.svg" : "/icons/star-black.svg"}
        onClick={() => handleClickStar(1)}
      />
      <Image
        {...styles}
        src={rate >= 2 ? "/icons/star-yellow.svg" : "/icons/star-black.svg"}
        onClick={() => handleClickStar(2)}
      />
      <Image
        {...styles}
        src={rate >= 3 ? "/icons/star-yellow.svg" : "/icons/star-black.svg"}
        onClick={() => handleClickStar(3)}
      />
      <Image
        {...styles}
        src={rate >= 4 ? "/icons/star-yellow.svg" : "/icons/star-black.svg"}
        onClick={() => handleClickStar(4)}
      />
      <Image
        {...styles}
        src={rate === 5 ? "/icons/star-yellow.svg" : "/icons/star-black.svg"}
        onClick={() => handleClickStar(5)}
      />
    </Box>
  );
}

Star.defaultProps = {
  mode: "view",
  display: "block",
  value: 0,
  baseSize: "12px",
  mdSize: "16px",
};
