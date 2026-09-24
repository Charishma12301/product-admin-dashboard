export default function Pagination({
  page,
  totalPages,
  limit,
  total,
  onPageChange,
  onPageSizeChange,
}) {
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-lg bg-white p-4 shadow md:flex-row md:items-center md:justify-between">
      
      {/* Showing text */}
      <p className="text-sm text-gray-600">
        Showing {start}–{end} of {total}
      </p>

      {/* Page size */}
      <div className="flex items-center gap-2">
        <label className="text-sm">
          Page size:
        </label>

        <select
          value={limit}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded border px-3 py-2"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Pagination buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="rounded border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`rounded px-3 py-2 ${
                pageNumber === page
                  ? "bg-black text-white"
                  : "border bg-white"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="rounded border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}