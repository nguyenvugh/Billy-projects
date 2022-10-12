import { Box, HStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
import { PaginationModelOptions, getPaginationModel } from "ultimate-pagination";

const HOVER_BG = { _hover: { bg: "green.primary", color: "white" } };
const HOVER_TEXT = {
  _hover: { transitionDuration: ".3s", bg: "green.primary", color: "white" },
};
const ITEMS_STYLES = {
  transitionDuration: ".3s",
  cursor: "pointer",
  minW: "40px",
  h: "40px",
  borderRadius: "4px",
  border: "1px solid #E2E2E2",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
type PaginationType = {
  value: number;
  isActive?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
  type: string;
};

function Page({ value, isActive, onClick }: PaginationType) {
  return (
    <Box
      {...ITEMS_STYLES}
      bg={isActive ? "green.primary" : "white"}
      color={isActive ? "white" : "black"}
      style={isActive ? { fontWeight: "bold" } : {}}
      onClick={onClick}
      {...HOVER_BG}
    >
      {value}
    </Box>
  );
}

function Ellipsis({ onClick }: PaginationType) {
  return (
    <Box {...ITEMS_STYLES} onClick={onClick}>
      . . .
    </Box>
  );
}

function FirstPageLink({ onClick }: PaginationType) {
  return (
    <Box {...ITEMS_STYLES} minW="max" {...HOVER_TEXT} onClick={onClick}>
      &lt;&lt;
    </Box>
  );
}

function PreviousPageLink({ onClick }: PaginationType) {
  return (
    <Box {...ITEMS_STYLES} {...HOVER_TEXT} onClick={onClick}>
      &lt;
    </Box>
  );
}

function NextPageLink({ onClick }: PaginationType) {
  return (
    <Box {...ITEMS_STYLES} {...HOVER_TEXT} onClick={onClick}>
      &gt;
    </Box>
  );
}

function LastPageLink({ onClick }: PaginationType) {
  return (
    <Box {...ITEMS_STYLES} {...HOVER_TEXT} onClick={onClick}>
      &gt;&gt;
    </Box>
  );
}

function renderItemComponentFunctionFactory(
  itemTypeToComponent: ItemType,
  currentPage: number,
  onChange: (page: number) => void,
) {
  function onItemClickFunctionFactory({ value, isDisabled }: PaginationType) {
    return () => {
      if (!isDisabled && onChange && currentPage !== value) {
        onChange(value);
      }
    };
  }

  return (props: PaginationType) => {
    const ItemComponent = itemTypeToComponent[props.type];
    const onItemClick = onItemClickFunctionFactory(props);
    return <ItemComponent onClick={onItemClick} {...props} />;
  };
}

type UltimatePaginationProps = PaginationModelOptions & {
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

/* eslint-disable @typescript-eslint/no-explicit-any*/
type ItemType = { [k: string]: any };
export function createUltimatePagination({ itemTypeToComponent }: ItemType) {
  function UltimatePaginationComponent(props: UltimatePaginationProps) {
    const {
      currentPage,
      totalPages,
      boundaryPagesRange,
      siblingPagesRange,
      hideEllipsis,
      hidePreviousAndNextPageLinks,
      hideFirstAndLastPageLinks,
      onPageChange,
      disabled,
      ...restProps
    } = props;

    const paginationModel = getPaginationModel({
      currentPage,
      totalPages,
      boundaryPagesRange,
      siblingPagesRange,
      hideEllipsis,
      hidePreviousAndNextPageLinks,
      hideFirstAndLastPageLinks: hideFirstAndLastPageLinks || true,
    });
    const renderItemComponent = renderItemComponentFunctionFactory(
      itemTypeToComponent,
      currentPage,
      onPageChange,
    );
    return (
      <HStack display="flex" spacing="1" fontSize="16px" cursor="pointer" {...restProps}>
        {paginationModel.map((itemModel) =>
          renderItemComponent({
            ...itemModel,
            isDisabled: !!disabled,
          }),
        )}
      </HStack>
    );
  }

  UltimatePaginationComponent.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    boundaryPagesRange: PropTypes.number,
    siblingPagesRange: PropTypes.number,
    hideEllipsis: PropTypes.bool,
    hidePreviousAndNextPageLinks: PropTypes.bool,
    hideFirstAndLastPageLinks: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
  };

  return UltimatePaginationComponent;
}

const itemTypeToComponent = {
  PAGE: Page,
  ELLIPSIS: Ellipsis,
  FIRST_PAGE_LINK: FirstPageLink,
  PREVIOUS_PAGE_LINK: PreviousPageLink,
  NEXT_PAGE_LINK: NextPageLink,
  LAST_PAGE_LINK: LastPageLink,
};

const Pagination = createUltimatePagination({ itemTypeToComponent });

export { Pagination };
