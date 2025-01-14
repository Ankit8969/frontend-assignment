import React from "react";
import '../styles/pagination.css'

const Pagination = ({totalNumberItem, itemPerPage, currentActivePage, setCurrentActivePage}) => {
  const totalPages = Math.ceil(totalNumberItem / itemPerPage);
  const handleNextPage = () => {
    setCurrentActivePage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentActivePage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentActivePage(page);
  };

  // Generate page numbers for the current range (up to 5 pages visible)
  const generatePageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentActivePage - 1);
    const endPage = Math.min(totalPages, currentActivePage + 3);
    console.log({startPage, endPage})
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <section className="pagination">
      {/* Previous Button */}

      <button
        className="prev"
        onClick={handlePreviousPage}
        disabled={currentActivePage === 1}
        style={{ cursor: currentActivePage === 1 ? "not-allowed" : "pointer" }}
      >
        {"<"}
      </button>

      <div className="paginationPages">
        {/* Handeling Page Numbers */}
        {generatePageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            style={{
              background: page === currentActivePage ? "#007BFF" : "#FFF",
              color: page === currentActivePage ? "#FFF" : "#000",
            }}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        className="next"
        onClick={handleNextPage}
        disabled={currentActivePage === totalPages}
        style={{
          cursor: currentActivePage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        {">"}
      </button>
    </section>
  );
};

export default Pagination;
