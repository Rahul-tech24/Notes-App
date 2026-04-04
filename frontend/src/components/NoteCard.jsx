import { useNavigate } from "react-router-dom";

function NoteCard({ note }) {
  const navigate = useNavigate();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(note.updatedAt || note.createdAt));

  return (
    <div
      onClick={() => navigate(`/notes/${note._id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/notes/${note._id}`);
        }
      }}
      role="button"
      tabIndex={0}
      className="note-card"
    >
      <div className="flex h-full flex-col gap-5 p-5 sm:p-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge">{formattedDate}</span>
          </div>

          <h3 className="title-md text-[1.4rem] sm:text-[1.6rem]">
            {note.title}
          </h3>

          <p className="note-card__content text-sm sm:text-[0.98rem]">
            {note.content}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[rgba(27,37,40,0.08)] pt-4">
          <p className="mini-mono text-[0.72rem] text-[var(--muted)]">
            Open note to edit or delete
          </p>

          <span className="text-sm font-medium text-[var(--accent-deep)]">
            Read note
          </span>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
