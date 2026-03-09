function Pagination({ page,setPage,totalPages }) {

  return (

    <div className="flex gap-4 mt-6">

      <button
        disabled={page===1}
        onClick={()=>setPage(page-1)}
      >
        Previous
      </button>

      <span>
        Page {page}
      </span>

      <button
        disabled={page===totalPages}
        onClick={()=>setPage(page+1)}
      >
        Next
      </button>

    </div>

  );

}

export default Pagination;