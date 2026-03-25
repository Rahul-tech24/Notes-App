import { useState } from "react";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { getNotes,createNote,deleteNote } from "../api/notes";
import api from "../api/axios";
import useDebounce from "../hooks/useDebounce";

import Navbar from "../components/Navbar";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

function Dashboard() {
  

 const queryClient = useQueryClient();

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 400);
 const [page,setPage] = useState(1);
 
 const {data,isLoading} = useQuery({
  queryKey:["notes",page,debouncedSearch],
  queryFn:()=>getNotes({page, search: debouncedSearch})
 });
  
 const createMutation = useMutation({
  mutationFn:createNote,
  onSuccess:()=>queryClient.invalidateQueries(["notes"])
 });

 const deleteMutation = useMutation({
  mutationFn:deleteNote,
  onSuccess:()=>queryClient.invalidateQueries(["notes"])
 });

 const updateMutation = useMutation({
  mutationFn:({id,data})=>api.put(`/notes/${id}`,data),
  onSuccess:()=>queryClient.invalidateQueries(["notes"])
 });
  

 if(isLoading) return <p>Loading...</p>;

 
   
  
 return(

 <>

     <Navbar />

     
 <div className="max-w-3xl mx-auto p-10">

 <NoteForm
  onCreate={(data)=>createMutation.mutate(data)}
 />

 <SearchBar
  value={search}
  onChange={(v) => {
    setPage(1);        // reset to page 1 when searching
    setSearch(v);
  }}
/>

 <div className="space-y-4">

 {data.notes.map(note=>(
  <NoteCard
   key={note._id}
   note={note}
   onDelete={(id)=>deleteMutation.mutate(id)}
   onUpdate={(id,data)=>updateMutation.mutate({id,data})}
  />
 ))}

 </div>

 <Pagination
  page={page}
  setPage={setPage}
  totalPages={data.totalPages}
 />

 </div>

 </>

 );

}

export default Dashboard;

