import { Box, Image } from "@chakra-ui/react";
import { Container, Next, PageGroup, Paginator, Previous } from "chakra-paginator";
import { useEffect, useState } from "react";
// styles
const styleButton = {
  margin: "0 8px",
  borderRadius: "0px",
  height: "28px",
  minWidth: "28px",
  padding: "0px",
  border: "1px solid #BCCCFF",
  background: "#FFFFFF",
};

const normalStyles = {
  w: 8,
  h: 8,
  fontSize: "sm",
  borderRadius: "0px",
  margin: "0 4px",
  _hover: {
    bg: "#F70D28",
    border: "none",
    color: "#FFFFFF",
  },
  bg: "#FFFFFF",
  border: "1px solid #BCCCFF",
};

const activeStyles = {
  w: 8,
  h: 8,
  fontSize: "sm",
  borderRadius: "0px",
  margin: "0 4px",
  _hover: {
    bg: "#F70D28",
    color: "#FFFFFF",
  },
  bg: "#F70D28",
  color: "#FFFFFF",
};

const separatorStyles = {
  w: 8,
  h: 8,
  bg: "#FFFFFF",
};
const Pagination = ({ current = 1, size = 10, total = 0, onChangePage, justify = "flex-end" }) => {
  // eslint-disable-next-line no-param-reassign
  current = parseInt(current);

  const handlePageChange = (nextPage) => {
    onChangePage instanceof Function && onChangePage(nextPage);
  };
  const [pagesQuantity, setPagesQuantity] = useState(0);

  useEffect(() => {
    const pagesTotal = Math.ceil(total / size);

    setPagesQuantity(pagesTotal);
  }, [total]);
  if (pagesQuantity === 0) {
    return <></>;
  }
  return (
    <Box my={8}>
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
        <Container align="end" justify={justify} h={8} fontSize={12}>
          <Previous style={styleButton}>
            <Image src="/imgs/nextLeft.svg" />
          </Previous>
          <PageGroup isInline align="center" />
          <Next style={styleButton}>
            <Image src="/imgs/nextRight.svg" />
          </Next>
        </Container>
      </Paginator>
    </Box>
  );
};

export default Pagination;
