import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      const res = await api.get(`/notes/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: (updatedNote) => api.put(`/notes/${id}`, updatedNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note", id] });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/notes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      navigate("/dashboard");
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-10 space-y-6">
        {isEditing ? (
          <>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-3xl font-bold border-b border-gray-300 outline-none bg-transparent"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-80 border rounded-xl p-4 font-mono"
              placeholder="Write markdown..."
            />

            <div className="flex gap-3">
              <button
                onClick={() => updateMutation.mutate({ title, content })}
                className="px-4 py-2 rounded bg-black text-white"
              >
                Save
              </button>

              <button
                onClick={() => {
                  setTitle(data.title);
                  setContent(data.content);
                  setIsEditing(false);
                }}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">{data.title}</h1>

            <div className="prose max-w-none dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {data.content}
              </ReactMarkdown>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded bg-black text-white"
              >
                Edit
              </button>

              <button
                onClick={() => deleteMutation.mutate()}
                className="px-4 py-2 rounded border border-red-500 text-red-500"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default NoteDetail;
