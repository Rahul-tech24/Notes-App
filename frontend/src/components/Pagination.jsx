function Pagination({ page, setPage, totalPages }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="surface-card mt-2 flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <p className="section-kicker mb-1">Navigation</p>
        <p className="body-muted text-sm">
          Page {page} of {totalPages}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-secondary"
          type="button"
        >
          Previous
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="btn btn-primary"
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
