import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const CategoryItem = ({ category, categorySelect }) => {
  const router = useRouter();

  const onCheck = (e, categoryItem) => {
    let { category } = router.query;
    if (typeof category === "string") {
      if (category === "") {
        category = [];
      } else {
        category = [category];
      }
    } else if (!Array.isArray(category)) {
      category = [];
    }
    if (e.target.checked) {
      category.push(categoryItem?.id);
    } else {
      const id = categoryItem?.id?.toString();
      category = category.filter((item) => item !== id);
      if (category.length === 0) {
        category = undefined;
      }
    }
    router.push({ query: { ...router.query, category, page: 1 } });
  };

  function renderCateTree(category, level) {
    return (
      <Accordion allowMultiple allowToggle>
        <AccordionItem borderTop="none" borderBottomColor="#BCCCFF">
          {({ isExpanded }) => (
            <>
              <AccordionButton
                p="12px 0"
                outline="none"
                color="#071133"
                fontSize={14}
                _hover={{ bg: "transparent" }}
                _focus={{ bg: "transparent" }}
                display="flex"
                justifyContent="space-between"
              >
                <Box padding="8px 0" key={category?.id}>
                  <Checkbox
                    pl={`${level * 15}px`}
                    borderColor="#BCCCFF"
                    title={category?.name}
                    isChecked={categorySelect.findIndex((item) => item?.id === category?.id) > -1}
                    onChange={(e) => onCheck(e, category)}
                  >
                    {category?.name}
                  </Checkbox>
                </Box>
                {Array.isArray(category?.childs) &&
                  category?.childs.length > 0 &&
                  (isExpanded ? <MinusIcon /> : <AddIcon />)}
              </AccordionButton>
              <AccordionPanel padding="0">
                {Array.isArray(category?.childs) &&
                  category.childs.map((category) =>
                    renderCateTree(category, !category.parentId ? 0 : level + 1),
                  )}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    );
  }

  return renderCateTree(category, 0);
};

export default CategoryItem;
