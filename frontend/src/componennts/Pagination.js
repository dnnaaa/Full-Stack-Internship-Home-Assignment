// components/Pagination.js
const Pagination = ({ pageInfo, onPageChange }) => {
    const { currentPage, totalPages } = pageInfo;

    const handlePageClick = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    return (
        <div>
            <button onClick={() => handlePageClick(currentPage - 1)}>Previous</button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button onClick={() => handlePageClick(currentPage + 1)}>Next</button>
        </div>
    );
};

export default Pagination;
