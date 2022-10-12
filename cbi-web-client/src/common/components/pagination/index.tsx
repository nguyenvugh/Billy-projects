import { Box, Image } from "@chakra-ui/react";
import {
  Container,
  Next,
  PageGroup,
  Paginator,
  Previous,
} from "chakra-paginator";
import React, { useState, useEffect } from "react";
// styles
const styleButton = {
  margin: "0 8px",
  height: "40px",
  minWidth: "40px",
  padding: "0px",
  borderRadius: "3px",
  border: "1px solid #BCCCFF",
  background: "#FFFFFF",
};

const normalStyles = {
  w: "40px",
  h: "40px",
  fontSize: "sm",
  margin: "0 4px",
  borderRadius: "3px",
  _hover: {
    bg: "#61A533",
    border: "none",
    color: "#FFFFFF",
  },
  bg: "#FFFFFF",
  border: "1px solid #BCCCFF",
};

const activeStyles = {
  w: "40px",
  h: "40px",
  fontSize: "sm",
  borderRadius: "3px",
  margin: "0 4px",
  _hover: {
    bg: "#61A533",
    color: "#FFFFFF",
  },
  bg: "#61A533",
  color: "#FFFFFF",
};

const separatorStyles = {
  w: "40px",
  h: "40px",
  bg: "#FFFFFF",
  borderRadius: "3px",
};
const Pagination = ({
  current = 1,
  size = 10,
  total = 0,
  onChangePage,
  ...styleProps
}: any) => {
  const handlePageChange = (nextPage: number) => {
    onChangePage instanceof Function && onChangePage(nextPage);
  };
  const [pagesQuantity, setPagesQuantity] = useState(0);

  useEffect(() => {
    const pagesTotal = Math.ceil(total / size);

    setPagesQuantity(pagesTotal);
  }, [total]);
  return (
    <Box my={8} {...styleProps}>
      <Paginator
        currentPage={current}
        onPageChange={handlePageChange}
        activeStyles={activeStyles}
        innerLimit={1}
        outerLimit={1}
        normalStyles={normalStyles}
        separatorStyles={separatorStyles}
        pagesQuantity={pagesQuantity}
      >
        <Container align="end" justify="flex-start" h={8} fontSize={12}>
          <Previous style={styleButton}>
            <Image src="/img/nextLeft.svg" />
          </Previous>
          <PageGroup isInline align="center" />
          <Next style={styleButton}>
            <Image src="/img/nextRight.svg" />
          </Next>
        </Container>
      </Paginator>
    </Box>
  );
};

export default Pagination;
