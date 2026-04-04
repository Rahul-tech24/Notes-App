import { Link } from "react-router-dom";

function AuthLayout({ eyebrow, title, description, footer, children }) {
  return (
    <div className="min-h-screen px-4 py-5 sm:px-6">
      <div className="app-frame grid min-h-[calc(100vh-2.5rem)] gap-6 lg:grid-cols-[1.05fr_minmax(0,460px)]">
        <section className="surface-card relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="absolute -left-8 top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(15,118,110,0.24),_transparent_68%)] blur-2xl" />
          <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(204,124,77,0.24),_transparent_72%)] blur-2xl" />

          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <div className="flex items-center justify-between gap-4">
              <Link to="/" className="inline-flex items-center gap-3">
                <span className="brand-mark">KS</span>
                <div>
                  <p className="mini-mono text-[0.7rem] text-[var(--muted)]">
                    Knowledge System
                  </p>
                  <p className="text-sm text-[var(--muted)]">Private notes</p>
                </div>
              </Link>

              <span className="badge">Focused</span>
            </div>

            <div className="max-w-xl space-y-5">
              <p className="section-kicker">{eyebrow}</p>
              <h1 className="title-xl">{title}</h1>
              <p className="body-muted text-base sm:text-lg">{description}</p>
            </div>
          </div>
        </section>

        <section className="surface-card flex items-center px-5 py-6 sm:px-7 sm:py-8">
          <div className="w-full space-y-6">
            {children}

            {footer ? (
              <>
                <div className="panel-divider" />
                <div className="text-sm text-[var(--muted)]">{footer}</div>
              </>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AuthLayout;
