import { ActionLink } from "@/components/ui/action-link";
import { demoProposal } from "@/data/mock-proposals";

const workflowSteps = [
  { label: "Brief", value: "Captured", note: "Client context and constraints" },
  { label: "Scope", value: "Shaped", note: "Deliverables grouped by outcome" },
  { label: "Price", value: "Estimated", note: "Clear value and timeline" },
  { label: "Preview", value: "Ready", note: "Static proposal page for review" },
];

const demoSignals = ["Static Next.js", "Mock data", "Optional SQLite schema"];

export default function HomePage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-[var(--background)] text-[color:var(--foreground)]">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <span className="inline-flex min-h-11 items-center text-lg font-black text-[color:var(--ink)]">
          ProposalForge
        </span>
        <ActionLink href="/dashboard" variant="secondary">
          Open workspace
        </ActionLink>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-6 sm:px-6 lg:min-h-[calc(100dvh-88px)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pb-20 lg:pt-8">
        <div className="max-w-3xl">
          <div className="mb-5 flex flex-wrap gap-2" aria-label="Demo boundaries">
            {demoSignals.map((signal) => (
              <span key={signal} className="pf-pill">
                {signal}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-black leading-tight text-[color:var(--ink)] sm:text-6xl">
            Turn a client brief into a proposal preview in minutes.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            ProposalForge is a public portfolio mockup for a commercial proposal workspace. It shows
            the intended flow with static data only: no auth, no Supabase, no LLM runtime and no
            hidden backend.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ActionLink href="/proposals/new">Try mock briefing</ActionLink>
            <ActionLink href="/dashboard" variant="secondary">
              View workspace
            </ActionLink>
          </div>
          <dl className="mt-9 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="pf-surface-soft px-4 py-3">
              <dt className="text-xs font-bold uppercase text-[color:var(--muted)]">Proposal</dt>
              <dd className="mt-1 text-xl font-black text-[color:var(--ink)]">
                {demoProposal.total}
              </dd>
            </div>
            <div className="pf-surface-soft px-4 py-3">
              <dt className="text-xs font-bold uppercase text-[color:var(--muted)]">Timeline</dt>
              <dd className="mt-1 text-xl font-black text-[color:var(--ink)]">
                {demoProposal.timeline}
              </dd>
            </div>
            <div className="pf-surface-soft px-4 py-3">
              <dt className="text-xs font-bold uppercase text-[color:var(--muted)]">Mode</dt>
              <dd className="mt-1 text-xl font-black text-[color:var(--ink)]">Demo</dd>
            </div>
          </dl>
        </div>

        <div className="pf-surface p-4 sm:p-5">
          <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase text-[color:var(--accent-deep)]">
                Proposal preview
              </p>
              <p className="mt-2 text-2xl font-black leading-tight text-[color:var(--ink)]">
                {demoProposal.title}
              </p>
              <p className="mt-1 text-sm font-semibold text-[color:var(--muted)]">
                {demoProposal.clientName}
              </p>
            </div>
            <span className="pf-status pf-status-sent self-start">{demoProposal.status}</span>
          </div>

          <div className="pf-inset mt-5 p-4">
            <p className="text-sm font-bold uppercase text-[color:var(--muted)]">Executive note</p>
            <p className="mt-2 text-base leading-7 text-[color:var(--ink)]">
              {demoProposal.summary}
            </p>
          </div>

          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="pf-inset p-4">
              <dt className="text-xs font-bold uppercase text-[color:var(--muted)]">Total</dt>
              <dd className="mt-1 text-2xl font-black text-[color:var(--ink)]">
                {demoProposal.total}
              </dd>
            </div>
            <div className="pf-inset p-4">
              <dt className="text-xs font-bold uppercase text-[color:var(--muted)]">Valid until</dt>
              <dd className="mt-1 text-2xl font-black text-[color:var(--ink)]">
                {demoProposal.validUntil}
              </dd>
            </div>
          </dl>

          <div className="mt-5">
            <p className="text-sm font-bold uppercase text-[color:var(--muted)]">Workflow shown</p>
            <div className="mt-3 grid gap-3">
              {workflowSteps.map((step, index) => (
                <div
                  key={step.label}
                  className="grid gap-3 border-t border-[var(--line)] py-3 sm:grid-cols-[44px_1fr]"
                >
                  <div className="pf-inset flex size-11 items-center justify-center text-sm font-black text-[color:var(--accent-deep)]">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-base font-black text-[color:var(--ink)]">
                      {step.label}: {step.value}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">{step.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
