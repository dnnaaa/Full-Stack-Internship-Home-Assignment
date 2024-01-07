const getPaginationGroup = (currentPage, windowSize, totalPages) => {
    let start = Math.max(currentPage - Math.floor(windowSize / 2), 1);
    let end = Math.min(start + windowSize - 1, totalPages);

    if (end - start + 1 < windowSize) {
        start = Math.max(end - windowSize + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
};

export { getPaginationGroup };