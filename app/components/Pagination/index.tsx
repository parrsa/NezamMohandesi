import React from 'react';

interface PaginationProps {
  pageNumbers: number[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageNumbers, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center justify-center mt-8">
      <button
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        className="w-8 h-8 flex items-center ml-2 justify-center bg-linear-to-r rounded-full from-blue-500 to-purple-500 text-white disabled:opacity-50 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 mx-0.5 rounded-md transition-all duration-300 font-medium ${currentPage === page
            ? 'bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-md'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          {page + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= pageNumbers.length - 1}
        className="w-8 h-8 flex items-center justify-center mr-2 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white disabled:opacity-50 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;