import React from "react";

function Pagination({ pages, options, setOptions }) {
  const handlePageChange = (page) => {
    if (options.page === page) return;

    setOptions({
      ...options,
      page,
    });
  };

  return (
    <div className="flex items-center justify-center pt-6">
      <div
        className={`mx-1 text-sm font-semibold text-gray-900 ${
          options.page === 1 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => options.page > 1 && handlePageChange(options.page - 1)}
      >
        <span className="hidden lg:block">&larr; Previous</span>
        <span className="block lg:hidden">&larr;</span>
      </div>
      {pages.map((_, ind) => (
        <div
          key={ind}
          className={`mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105 cursor-pointer ${
            options.page === ind + 1 && "bg-slate-200"
          }`}
          onClick={() => handlePageChange(ind + 1)}
        >
          {ind + 1}
        </div>
      ))}
      <div
        className={`mx-2 text-sm font-semibold text-gray-900 ${
          options.page === pages.length
            ? "cursor-not-allowed"
            : "cursor-pointer"
        }`}
        onClick={() =>
          options.page < pages.length && handlePageChange(options.page + 1)
        }
      >
        <span className="hidden lg:block">Next &rarr;</span>
        <span className="block lg:hidden">&rarr;</span>
      </div>
    </div>
  );
}

export default Pagination;
