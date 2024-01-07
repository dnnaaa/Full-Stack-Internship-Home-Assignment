import React from 'react';

/**
 * Pagination component that handles rendering page numbers and navigation buttons.
 * @param {number} currentPage - The current active page.
 * @param {number} totalPages - The total number of pages.
 * @param {function} onPageChange - Callback function for page change.
 * @returns {JSX.Element} - The rendered pagination component.
 */
const Pagination = ({currentPage, totalPages, onPageChange}) => {
    /**
     * Callback function for handling page change.
     * @param {number} page - The selected page.
     */
    const handlePageChange = (page) => {
        onPageChange(page);
    };

    /**
     * Callback function for handling previous button click.
     */
    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    /**
     * Callback function for handling next button click.
     */
    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    /**
     * Function for rendering the page numbers.
     * @returns {JSX.Element[]} - The array of rendered page number buttons.
     */
    const renderPageNumbers = () => {
        const pagesToShow = 3;
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`mx-1 px-3 py-1 border ${
                        i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                    } rounded focus:outline-none`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-center mt-4">
            <button
                className="mx-1 px-3 py-1 border bg-white text-blue-500 rounded focus:outline-none"
                onClick={handlePrev}
            >
                Prev
            </button>

            {renderPageNumbers()}

            <button
                className="mx-1 px-3 py-1 border bg-white text-blue-500 rounded focus:outline-none"
                onClick={handleNext}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;