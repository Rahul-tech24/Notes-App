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
import DashboardSkeleton from "../components/DashboardSkeleton";

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
  mutationFn: createNote,

  onMutate: async (newNote) => {
    await queryClient.cancelQueries({ queryKey: ["notes"] });

    const previousNotesData = queryClient.getQueryData([
      "notes",
      page,
      debouncedSearch,
    ]);

    const tempNote = {
      _id: "temp-" + Date.now(),
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date().toISOString(),
      optimistic: true
    };

    queryClient.setQueryData(
      ["notes", page, debouncedSearch],
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          notes: [tempNote, ...oldData.notes],
        };
      }
    );

    return { previousNotesData, tempNote };
  },

  onError: (error, newNote, context) => {
    if (context?.previousNotesData) {
      queryClient.setQueryData(
        ["notes", page, debouncedSearch],
        context.previousNotesData
      );
    }
  },

  onSuccess: (serverNote, newNote, context) => {
    queryClient.setQueryData(
      ["notes", page, debouncedSearch],
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          notes: oldData.notes.map((note) =>
            note._id === context.tempNote._id ? serverNote : note
          ),
        };
      }
    );
  },

  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  },
 });
  

 const deleteMutation = useMutation({
  mutationFn: deleteNote,

  onMutate: async (noteId) => {
    await queryClient.cancelQueries({ queryKey: ["notes"] });

    const previousNotesData = queryClient.getQueryData([
      "notes",
      page,
      debouncedSearch,
    ]);

    queryClient.setQueryData(
      ["notes", page, debouncedSearch],
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          notes: oldData.notes.filter((note) => note._id !== noteId),
        };
      }
    );

    return { previousNotesData };
  },

  onError: (error, noteId, context) => {
    if (context?.previousNotesData) {
      queryClient.setQueryData(
        ["notes", page, debouncedSearch],
        context.previousNotesData
      );
    }
  },

  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  },
});

 const updateMutation = useMutation({
  mutationFn:({id,data})=>api.put(`/notes/${id}`,data),
  onSuccess:()=>queryClient.invalidateQueries(["notes"])
 });
  

 if (isLoading) return <DashboardSkeleton />;

 
   
  
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

