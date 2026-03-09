function SearchBar({ search,setSearch }) {

  return (

    <input
      placeholder="Search notes..."
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      className="border p-2 w-full mb-6"
    />

  );

}

export default SearchBar;