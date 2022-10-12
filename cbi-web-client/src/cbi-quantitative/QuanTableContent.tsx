import { scrollToEl } from "@cbi/utils/index";
import { Box, Button, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { CBI_QUANTITATIVE, CBI_QUANTITATIVE_CONTAINER_ID } from "./constants";

function QuanTableContent({ onSubmit }: { onSubmit: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCode, setSelectedCode] = useState(1);
  const tableContent = CBI_QUANTITATIVE.map(({ title, code }) => ({ title, code }));

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (!containerRef.current) return;
      const element = containerRef.current;
      const container = document.getElementById(CBI_QUANTITATIVE_CONTAINER_ID);
      if (!container || !element) return;
      const containerTop = container.getBoundingClientRect().top;
      const top = containerTop > 0 ? 0 : containerTop * -1;
      element.style.top = top + "px";
      if (containerTop < 0 && container.offsetHeight + containerTop < 450) {
        element.style.opacity = "0";
      } else {
        element.style.opacity = "1";
        // element.style.visibility = "visible";
      }
    });
    return () => window.removeEventListener("scroll", () => {});
  }, []);

  function handleSelectCode(code: number) {
    setSelectedCode(code);
    if (code === selectedCode) return;
    scrollToEl(code + "");
  }
  return (
    <Box
      bg="white"
      ref={containerRef}
      position="relative"
      top="0px"
      w="255px"
      borderRight="1px solid #E2E8F0"
      boxSizing="content-box"
      p="3"
      pr="0"
      zIndex="10000"
    >
      <Text fontSize="30px" fontWeight="700" color="#2D3748">
        CEBI
      </Text>
      <UnorderedList spacing="2" cursor="pointer">
        {tableContent.map(({ title, code }) => {
          const isSelected = code === selectedCode;
          return (
            <ListItem
              pr="1"
              fontSize="14px"
              fontWeight="500"
              color="#2D3748"
              _hover={{
                color: "#61A533",
              }}
              borderRight={isSelected ? "6px solid #61A533" : "unset"}
              onClick={() => handleSelectCode(code)}
            >
              {title}
            </ListItem>
          );
        })}
      </UnorderedList>
      <Button
        mt="5"
        w="100%"
        h="48px"
        bg="#61A533"
        borderRadius="6px"
        color="white"
        _hover={{
          bg: "#61A533",
        }}
        onClick={onSubmit}
      >
        Hoàn thành
      </Button>
    </Box>
  );
}

export { QuanTableContent };
