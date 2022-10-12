import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import React, { useCallback, useEffect, useState, useRef } from "react";
// eslint-disable-next-line import/no-unresolved
import { formatPrice } from "@ltp/utils/price";
import useTranslation from "@ltp/hooks/useTranslation";

const MultiRangeSlider = ({ min, max }) => {
  const { t } = useTranslation();
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <Box className="container-multi-range-slider">
      <Box className="container" margin="16px 0">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - 100 && "5" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="thumb thumb--right"
        />

        <Box className="slider">
          <Box className="slider__track" />
          <Box ref={range} className="slider__range" />
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-evenly">
        <Box className="slider__left-value">{formatPrice(minVal)}</Box>
        <Box className="slider__right-value">{formatPrice(maxVal)}</Box>
      </Box>
      <Button
        background="#2154FF"
        padding="12px 0"
        align="center"
        width="100%"
        fontSize="16px"
        color="#FFFFFF"
        margin="16px 0"
        _hover={{ bg: "#2154FF" }}
        _focus={{ bg: "#2154FF" }}
      >
        {t("apply")}
      </Button>
    </Box>
  );
};

export default MultiRangeSlider;
