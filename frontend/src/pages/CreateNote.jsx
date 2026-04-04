import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../api/notes";
import Navbar from "../components/Navbar";

function CreateNote() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    title: "",
    content: ""
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (createdNote) => {
      queryClient.setQueryData(["note", createdNote._id], createdNote);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      navigate(`/notes/${createdNote._id}`);
    }
  });

  const errorMessage = createMutation.error?.response?.data?.message;

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = form.title.trim();
    const trimmedContent = form.content.trim();

    if (!trimmedTitle || !trimmedContent) {
      return;
    }

    createMutation.mutate({
      title: trimmedTitle,
      content: trimmedContent
    });
  };

  return (
    <>
      <Navbar />

      <div className="px-4 pb-10 pt-6 sm:px-6">
        <div className="app-frame space-y-6">
          <section className="surface-card p-6 sm:p-7">
            <div className="space-y-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="btn btn-ghost"
                type="button"
              >
                Back
              </button>

              <div className="space-y-2">
                <p className="section-kicker">Create Note</p>
                <h1 className="title-lg">New note</h1>
              </div>
            </div>
          </section>

          <section className="surface-card p-6 sm:p-7">
            {errorMessage ? (
              <div className="status-error mb-5">{errorMessage}</div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="create-title" className="field-label">
                  Title
                </label>
                <input
                  id="create-title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="field-input"
                />
              </div>

              <div>
                <label htmlFor="create-content" className="field-label">
                  Content
                </label>
                <textarea
                  id="create-content"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  className="field-textarea min-h-[420px] font-[var(--font-mono)]"
                  placeholder="Write here..."
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? "Creating..." : "Create Note"}
                </button>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="btn btn-secondary"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default CreateNote;
