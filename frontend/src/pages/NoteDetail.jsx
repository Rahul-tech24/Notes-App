import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  deleteNote as deleteNoteRequest,
  getNote,
  updateNote as updateNoteRequest
} from "../api/notes";
import Navbar from "../components/Navbar";
import SkeletonBlock from "../components/SkeletonBlock";

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    title: "",
    content: ""
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNote(id)
  });

  const updateMutation = useMutation({
    mutationFn: (updatedNote) => updateNoteRequest(id, updatedNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note", id] });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsEditing(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteNoteRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      navigate("/dashboard");
    }
  });

  if (isLoading) {
    return (
      <>
        <Navbar />

        <div className="px-4 pb-10 pt-6 sm:px-6">
          <div className="app-frame space-y-6">
            <section className="surface-card p-6 sm:p-7">
              <SkeletonBlock className="mb-3 h-4 w-28" />
              <SkeletonBlock className="mb-3 h-16 w-3/4" />
              <SkeletonBlock className="h-4 w-1/2" />
            </section>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
              <section className="surface-card p-6 sm:p-7">
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="mt-4 h-4 w-11/12" />
                <SkeletonBlock className="mt-4 h-4 w-10/12" />
                <SkeletonBlock className="mt-8 h-44 w-full rounded-[22px]" />
              </section>

              <section className="surface-card p-6 sm:p-7">
                <SkeletonBlock className="h-10 w-full rounded-full" />
                <SkeletonBlock className="mt-3 h-10 w-full rounded-full" />
                <SkeletonBlock className="mt-6 h-20 w-full rounded-[22px]" />
              </section>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Navbar />

        <div className="px-4 pb-10 pt-6 sm:px-6">
          <div className="app-frame">
            <div className="surface-card p-8 sm:p-10">
              <p className="section-kicker mb-3">Unable To Open Note</p>
              <h1 className="title-md mb-3">This note could not be loaded.</h1>
              <p className="body-muted mb-6">
                {error?.response?.data?.message ||
                  "The note may have been removed or the session may have expired."}
              </p>

              <button
                onClick={() => navigate("/dashboard")}
                className="btn btn-primary"
                type="button"
              >
                Back to Workspace
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const noteDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(data.updatedAt || data.createdAt));

  return (
    <>
      <Navbar />

      <div className="px-4 pb-10 pt-6 sm:px-6">
        <div className="app-frame space-y-6">
          <section className="surface-card p-6 sm:p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="btn btn-ghost"
                  type="button"
                >
                  Back
                </button>

                <div className="space-y-3">
                  <p className="section-kicker">Note Detail</p>
                  <h1 className="title-lg">{data.title}</h1>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="badge">{noteDate}</span>
              </div>
            </div>
          </section>

          {isEditing ? (
            <section className="surface-card p-6 sm:p-7">
              <div className="mb-6">
                <p className="section-kicker mb-2">Editing</p>
                <h2 className="title-md">Edit note</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="detail-title" className="field-label">
                    Title
                  </label>
                  <input
                    id="detail-title"
                    value={draft.title}
                    onChange={(e) =>
                      setDraft((current) => ({
                        ...current,
                        title: e.target.value
                      }))
                    }
                    className="field-input"
                  />
                </div>

                <div>
                  <label htmlFor="detail-content" className="field-label">
                    Content
                  </label>
                  <textarea
                    id="detail-content"
                    value={draft.content}
                    onChange={(e) =>
                      setDraft((current) => ({
                        ...current,
                        content: e.target.value
                      }))
                    }
                    className="field-textarea min-h-[420px] font-[var(--font-mono)]"
                    placeholder="Write markdown..."
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => updateMutation.mutate(draft)}
                  className="btn btn-primary"
                  type="button"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-secondary"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </section>
          ) : (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
              <article className="surface-card p-6 sm:p-8">
                <div className="markdown-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {data.content}
                  </ReactMarkdown>
                </div>
              </article>

              <aside className="surface-card h-fit p-6 sm:p-7">
                <div className="space-y-5">
                  <div>
                    <p className="section-kicker mb-2">Actions</p>
                    <h2 className="title-md">Actions</h2>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        setDraft({
                          title: data.title,
                          content: data.content
                        });
                        setIsEditing(true);
                      }}
                      className="btn btn-primary w-full"
                      type="button"
                    >
                      Edit Note
                    </button>

                    <button
                      onClick={() => deleteMutation.mutate()}
                      className="btn btn-danger w-full"
                      type="button"
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? "Deleting..." : "Delete Note"}
                    </button>
                  </div>

                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NoteDetail;
