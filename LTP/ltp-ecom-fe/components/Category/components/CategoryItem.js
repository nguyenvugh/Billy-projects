import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { getValidSlug } from "@ltp/utils/index";
import { ROUTE_CATEGORY } from "@ltp/utils/constant";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import { useRouter } from "next/router";

const CategoryItem = ({ category, slugSelected }) => {
  const router = useRouter();

  const onCheck = (e, categoryItem) => {
    const slug = getValidSlug(categoryItem);
    let routeCate = ROUTE_CATEGORY(router.locale);
    if (e.target.checked) {
      routeCate = `${routeCate}/${slug}`;
    }
    window.location.href = addTrailingSlash(routeCate);
  };

  function renderCateTree(category, level) {
    return (
      <Accordion allowMultiple allowToggle defaultIndex={slugSelected ? [0] : []}>
        <AccordionItem borderTop="none" borderBottomColor="#BCCCFF">
          {({ isExpanded }) => (
            <>
              <AccordionButton
                py="12px"
                pl="8px"
                outline="none"
                color="#071133"
                fontSize={14}
                _hover={{ bg: "transparent" }}
                _focus={{ bg: "transparent" }}
                display="flex"
                justifyContent="space-between"
              >
                <Checkbox
                  pl={`${level * 15}px`}
                  borderColor="#BCCCFF"
                  title={category?.name}
                  isChecked={slugSelected === category?.slug}
                  onChange={(e) => onCheck(e, category)}
                >
                  <Text as={!category.parentId ? "h5" : "p"} textAlign="left" flexGrow={1}>
                    {category?.name}
                  </Text>
                </Checkbox>
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

  return <>{renderCateTree(category, 0)}</>;
};

export default CategoryItem;
