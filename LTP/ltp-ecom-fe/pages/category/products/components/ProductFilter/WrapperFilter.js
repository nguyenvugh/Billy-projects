import { AccordionButton, AccordionItem, AccordionPanel } from "@chakra-ui/accordion";
import { Text } from "@chakra-ui/layout";
import { Fragment } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function WrapperFilter({ title, children }) {
  return (
    <AccordionItem border="none" padding="0">
      {({ isExpanded }) => (
        <>
          <AccordionButton
            p="12px 0px"
            borderBottom="1px solid #BCCCFF"
            outline="none"
            fontSize={16}
            fontWeight={500}
            _hover={{ bg: "transparent" }}
            _focus={{ bg: "transparent" }}
          >
            <Text flexGrow={1} textAlign="left" textTransform="uppercase">
              {title}
            </Text>
            {isExpanded ? <FiChevronDown /> : <FiChevronUp />}
          </AccordionButton>
          <AccordionPanel px="0px">{children}</AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}
