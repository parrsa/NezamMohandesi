  
  
  export const useGeneratePageNumbers = (totalPages:number ,currentPage:number) => {
    const pages = [];
    const maxVisiblePages = 6;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 2);
      if (currentPage <= 3) {
        endPage = 4;
        for (let i = 2; i <= endPage; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages -1)
      }
      else if (currentPage >= totalPages - 2) {
        pages.push(2)
        pages.push("...");
        startPage = totalPages - 3;
        for (let i = startPage; i < totalPages; i++) {
          pages.push(i);
        }
      }
      else {
        pages.push("...");
        for (let i = startPage; i < endPage; i++) {
          pages.push(i);
        }
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };