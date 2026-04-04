import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../api/notes";
import useDebounce from "../hooks/useDebounce";

import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import DashboardSkeleton from "../components/DashboardSkeleton";

function Dashboard() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => getNotes({ page, search: debouncedSearch })
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <DashboardSkeleton />
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
              <p className="section-kicker mb-3">Could Not Load Notes</p>
              <h1 className="title-md mb-3">
                Your workspace is temporarily unavailable.
              </h1>
              <p className="body-muted">
                {error?.response?.data?.message ||
                  "Please refresh the page and try again."}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  const notes = data?.notes ?? [];
  const totalNotes = data?.total ?? 0;
  const searchLabel = debouncedSearch
    ? `Showing results for "${debouncedSearch}"`
    : "All notes in your workspace";

  return (
    <>
      <Navbar />

      <div className="px-4 pb-10 pt-6 sm:px-6">
        <div className="app-frame space-y-6">
          <section className="surface-card p-6 sm:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="section-kicker">Workspace</p>
                <h1 className="title-lg">Your note library</h1>
                <p className="body-muted">{searchLabel}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/notes/new" className="btn btn-primary">
                  Create Note
                </Link>
                <span className="badge">{totalNotes} notes</span>
              </div>
            </div>

            <div className="mt-5">
              <SearchBar
                value={search}
                onChange={(value) => {
                  setPage(1);
                  setSearch(value);
                }}
              />
            </div>
          </section>

          {notes.length === 0 ? (
            <div className="surface-card p-8 sm:p-10">
              <h2 className="title-md mb-3">
                {debouncedSearch ? "No notes found." : "No notes yet."}
              </h2>
              <p className="body-muted">
                {debouncedSearch
                  ? "Try a different search."
                  : "Create your first note to get started."}
              </p>

              {!debouncedSearch ? (
                <div className="mt-6">
                  <Link to="/notes/new" className="btn btn-primary">
                    Create Note
                  </Link>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} />
              ))}
            </div>
          )}

          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data.totalPages}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
