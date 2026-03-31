import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function NoteDetail() {

  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      const res = await api.get(`/notes/${id}`);
      return res.data;
    }
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-10 space-y-6">

        <h1 className="text-3xl font-bold">
          {data.title}
        </h1>

        <p className="text-gray-600 whitespace-pre-line">
          {data.content}
        </p>

      </div>
    </>
  );
}

export default NoteDetail;