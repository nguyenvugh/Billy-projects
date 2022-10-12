import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PaginationBottomType } from "src/podcast/interface";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import "src/podcast/paginate.css";

const PaginateBottom = ({ meta, setPage }: PaginationBottomType) => {
  const [searchParams, setSearchParams] = useSearchParams({});

  const totalPages = meta?.totalPages;
  const pageNumber = searchParams.get("page");

  const handlePageChange = (e) => {
    setSearchParams({
      page: `${e.selected + 1}`,
    });
  };

  useEffect(() => {
    if (!pageNumber || +pageNumber > totalPages || !pageNumber || +pageNumber <= 0) {
      setSearchParams({
        page: "1",
      });
    } else setPage(+pageNumber);
  }, [pageNumber]);

  return (
    <ReactPaginate
      previousLabel={<FiChevronLeft />}
      nextLabel={<FiChevronRight />}
      pageCount={totalPages}
      onPageChange={handlePageChange}
      forcePage={Number(pageNumber) - 1}
      activeClassName="active"
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
    />
  );
};

export default PaginateBottom;
