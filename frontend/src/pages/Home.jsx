import { Link } from "react-router-dom";

function Home() {
  const hasToken = Boolean(localStorage.getItem("token"));

  return (
    <div className="min-h-screen px-4 py-5 sm:px-6">
      <div className="app-frame flex min-h-[calc(100vh-2.5rem)] flex-col gap-6">
        <header className="surface-card flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="brand-mark">KS</span>

            <div>
              <p className="mini-mono text-[0.72rem] text-[var(--muted)]">
                Knowledge System
              </p>
              <p className="text-sm text-[var(--muted)]">Private notes</p>
            </div>
          </div>

          <span className="badge">Minimal workspace</span>
        </header>

        <main className="surface-card relative flex flex-1 items-center overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="absolute -left-8 top-10 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(15,118,110,0.24),_transparent_70%)] blur-3xl" />
          <div className="absolute bottom-4 right-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(204,124,77,0.22),_transparent_72%)] blur-3xl" />

          <div className="relative z-10 grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
            <div className="max-w-3xl space-y-5">
              <p className="section-kicker">Private Knowledge Workspace</p>

              <h1 className="title-xl">
                Write less noise. Keep more signal.
              </h1>

              <p className="body-muted max-w-2xl text-base sm:text-lg">
                A calm place for personal notes, drafts, and ideas you want to
                revisit.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to={hasToken ? "/dashboard" : "/register"}
                  className="btn btn-primary"
                >
                  {hasToken ? "Open Workspace" : "Get Started"}
                </Link>

                <Link
                  to={hasToken ? "/dashboard" : "/login"}
                  className="btn btn-secondary"
                >
                  {hasToken ? "View Notes" : "Log In"}
                </Link>
              </div>
            </div>

            <div className="rounded-[26px] border border-[rgba(27,37,40,0.1)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.76),_rgba(250,246,239,0.96))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]">
              <p className="section-kicker mb-3">Quiet Features</p>
              <div className="space-y-3 text-sm text-[var(--muted)]">
                <p>Private notes</p>
                <p>Searchable library</p>
                <p>Markdown detail view</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
