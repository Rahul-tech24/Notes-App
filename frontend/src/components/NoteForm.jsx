import { useState } from "react";

function NoteForm({ onCreate, isSubmitting = false }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      return;
    }

    onCreate({
      title: trimmedTitle,
      content: trimmedContent
    });

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="note-title" className="field-label">
          Title
        </label>
        <input
          id="note-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What is this note about?"
          className="field-input"
        />
      </div>

      <div>
        <label htmlFor="note-content" className="field-label">
          Content
        </label>
        <textarea
          id="note-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write the idea, the insight, or the draft you want to keep..."
          className="field-textarea"
        />
      </div>

      <button className="btn btn-primary w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving note..." : "Create Note"}
      </button>

      <p className="body-muted text-sm">
        Markdown becomes especially useful in the full note view.
      </p>
    </form>
  );
}

export default NoteForm;
