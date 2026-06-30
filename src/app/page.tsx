import { ActionLink } from "@/components/ui/action-link";
import { demoProposal } from "@/data/mock-proposals";

const proofPoints = ["Brief captured", "Scope shaped", "Price estimated", "Proposal previewed"];

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-[var(--background)] text-[color:var(--foreground)]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <span className="text-lg font-bold text-[color:var(--ink)]">ProposalForge</span>
        <ActionLink href="/dashboard" variant="secondary">
          Open dashboard
        </ActionLink>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-8 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-14">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase text-[color:var(--accent)]">
            Public portfolio mockup
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[color:var(--ink)] sm:text-6xl">
            A visible proposal workspace demo.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            ProposalForge is a static Next.js mockup for turning a qualified client brief into a
            polished proposal. It uses local demo data and an optional SQLite schema, with no
            external backend required.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ActionLink href="/proposals/new">Start briefing</ActionLink>
            <ActionLink href="/dashboard" variant="secondary">
              View workspace
            </ActionLink>
          </div>
        </div>

        <div className="border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
            <div>
              <p className="text-sm font-semibold text-[color:var(--muted)]">
                Mock proposal preview
              </p>
              <p className="text-2xl font-bold text-[color:var(--ink)]">{demoProposal.title}</p>
            </div>
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm font-semibold text-[color:var(--accent)]">
              {demoProposal.status}
            </span>
          </div>
          <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{demoProposal.summary}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="border border-[var(--line)] bg-white/60 p-3">
              <p className="text-xs font-semibold uppercase text-[color:var(--muted)]">Client</p>
              <p className="mt-1 font-bold text-[color:var(--ink)]">{demoProposal.clientName}</p>
            </div>
            <div className="border border-[var(--line)] bg-white/60 p-3">
              <p className="text-xs font-semibold uppercase text-[color:var(--muted)]">Value</p>
              <p className="mt-1 font-bold text-[color:var(--ink)]">{demoProposal.total}</p>
            </div>
          </div>
          <dl className="mt-5 divide-y divide-[var(--line)] border border-[var(--line)]">
            {proofPoints.map((point, index) => (
              <div
                key={point}
                className="grid gap-1 bg-white/50 p-4 sm:grid-cols-[88px_1fr] sm:items-center"
              >
                <dt className="text-sm font-semibold text-[color:var(--muted)]">
                  Step {index + 1}
                </dt>
                <dd className="text-lg font-bold text-[color:var(--ink)]">{point}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
