import { ActionLink } from "@/components/ui/action-link";

const proofPoints = [
  "Structured brief",
  "Scope and deliverables",
  "Pricing estimate",
  "Share-ready proposal",
];

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
            Proposal workspace
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[color:var(--ink)] sm:text-6xl">
            ProposalForge
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            Turn a qualified client brief into a proposal with a clear problem statement, scope,
            timeline, pricing and acceptance path.
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
              <p className="text-sm font-semibold text-[color:var(--muted)]">Draft quality</p>
              <p className="text-2xl font-bold text-[color:var(--ink)]">Validated before save</p>
            </div>
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm font-semibold text-[color:var(--accent)]">
              v0.1
            </span>
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
