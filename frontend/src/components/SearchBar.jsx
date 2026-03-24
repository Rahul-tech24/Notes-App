-+9
function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search notes..."
      className="border p-2 w-full mb-4"
    />
  );
}
export default SearchBar;