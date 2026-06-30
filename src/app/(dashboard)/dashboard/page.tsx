import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { ActionLink } from "@/components/ui/action-link";
import { demoProposal, proposalPipeline, statusSummaries } from "@/data/mock-proposals";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Workspace"
        title="Mock dashboard"
        description="A static portfolio view of the proposal workflow. No login, database or external service is required."
        actions={<ActionLink href="/proposals/new">New proposal</ActionLink>}
      />

      <section className="grid gap-4 md:grid-cols-3" aria-label="Proposal status summary">
        {statusSummaries.map((summary) => (
          <article
            key={summary.label}
            className="border border-[var(--line)] bg-[var(--surface)] p-5"
          >
            <p className="text-sm font-semibold uppercase text-[color:var(--muted)]">
              {summary.label}
            </p>
            <p className="mt-3 text-4xl font-bold text-[color:var(--ink)]">{summary.value}</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{summary.note}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="border border-[var(--line)] bg-[var(--surface)] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-[color:var(--ink)]">Proposal pipeline</h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                Static records for reviewers to understand the intended workflow.
              </p>
            </div>
            <ActionLink href="/proposals/new" variant="secondary">
              Open briefing
            </ActionLink>
          </div>

          <div className="mt-6 divide-y divide-[var(--line)] border border-[var(--line)]">
            {proposalPipeline.map((proposal) => (
              <article
                key={`${proposal.clientName}-${proposal.title}`}
                className="grid gap-3 bg-white/50 p-4 md:grid-cols-[1fr_96px_88px]"
              >
                <div>
                  <p className="text-base font-bold text-[color:var(--ink)]">{proposal.title}</p>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">{proposal.clientName}</p>
                </div>
                <p className="font-bold text-[color:var(--ink)]">{proposal.value}</p>
                <p className="text-sm font-semibold text-[color:var(--accent)]">
                  {proposal.status}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="border border-[var(--line)] bg-[var(--surface)] p-6">
          <div>
            <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">
              Selected preview
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[color:var(--ink)]">
              {demoProposal.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
              {demoProposal.summary}
            </p>
          </div>

          <dl className="mt-5 grid gap-3">
            <div className="border border-[var(--line)] bg-white/60 p-3">
              <dt className="text-xs font-semibold uppercase text-[color:var(--muted)]">
                Timeline
              </dt>
              <dd className="mt-1 font-bold text-[color:var(--ink)]">{demoProposal.timeline}</dd>
            </div>
            <div className="border border-[var(--line)] bg-white/60 p-3">
              <dt className="text-xs font-semibold uppercase text-[color:var(--muted)]">
                Valid until
              </dt>
              <dd className="mt-1 font-bold text-[color:var(--ink)]">{demoProposal.validUntil}</dd>
            </div>
          </dl>
        </aside>
      </section>
    </DashboardShell>
  );
}
