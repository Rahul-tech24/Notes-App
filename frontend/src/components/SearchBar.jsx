function SearchBar({ value, onChange }) {
  
  return (
    <div className="search-shell">
      <span className="search-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </span>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search notes by title..."
      />

      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="btn btn-ghost min-h-0 px-3 py-2 text-sm"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}

export default SearchBar;
