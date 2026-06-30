import { DashboardShell } from "@/components/layout/dashboard-shell";
import { PageHeader } from "@/components/layout/page-header";
import { ActionLink } from "@/components/ui/action-link";
import { demoProposal, proposalPipeline, statusSummaries } from "@/data/mock-proposals";

function getStatusClassName(status: string) {
  switch (status) {
    case "Draft":
      return "pf-status-draft";
    case "Accepted":
      return "pf-status-accepted";
    case "Sent":
    default:
      return "pf-status-sent";
  }
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Workspace"
        title="Proposal workspace"
        description="A static portfolio view of the proposal workflow. It uses mock records only, so reviewers can inspect the product direction without a login or external service."
        actions={<ActionLink href="/proposals/new">New mock briefing</ActionLink>}
      />

      <section className="grid gap-4 md:grid-cols-3" aria-label="Proposal status summary">
        {statusSummaries.map((summary) => (
          <article key={summary.label} className="pf-surface p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black uppercase text-[color:var(--muted)]">
                {summary.label}
              </p>
              <span className={`pf-status ${getStatusClassName(summary.label)}`}>
                {summary.label}
              </span>
            </div>
            <p className="mt-5 text-4xl font-black text-[color:var(--ink)]">{summary.value}</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{summary.note}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="pf-surface p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-[color:var(--ink)]">Pipeline</h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                Three sample proposals showing draft, sent and accepted states.
              </p>
            </div>
            <ActionLink href="/proposals/new" variant="secondary">
              Open briefing
            </ActionLink>
          </div>

          <div className="mt-6 grid gap-3">
            {proposalPipeline.map((proposal) => (
              <article
                key={`${proposal.clientName}-${proposal.title}`}
                className="pf-surface-soft grid gap-4 p-4 md:grid-cols-[1fr_108px_104px] md:items-center"
              >
                <div>
                  <p className="text-base font-black text-[color:var(--ink)]">{proposal.title}</p>
                  <p className="mt-1 text-sm font-medium text-[color:var(--muted)]">
                    {proposal.clientName} · Updated {proposal.updatedAt}
                  </p>
                </div>
                <p className="text-lg font-black text-[color:var(--ink)]">{proposal.value}</p>
                <span className={`pf-status ${getStatusClassName(proposal.status)}`}>
                  {proposal.status}
                </span>
              </article>
            ))}
          </div>
        </div>

        <aside className="pf-surface p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase text-[color:var(--accent-deep)]">
                Selected preview
              </p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-[color:var(--ink)]">
                {demoProposal.title}
              </h2>
            </div>
            <span className="pf-status pf-status-sent">{demoProposal.status}</span>
          </div>

          <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{demoProposal.summary}</p>

          <dl className="mt-5 grid gap-3">
            <div className="pf-inset p-4">
              <dt className="text-xs font-bold uppercase text-[color:var(--muted)]">Timeline</dt>
              <dd className="mt-1 text-lg font-black text-[color:var(--ink)]">
                {demoProposal.timeline}
              </dd>
            </div>
            <div className="pf-inset p-4">
              <dt className="text-xs font-bold uppercase text-[color:var(--muted)]">Valid until</dt>
              <dd className="mt-1 text-lg font-black text-[color:var(--ink)]">
                {demoProposal.validUntil}
              </dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-[var(--line)] pt-5">
            <p className="text-sm font-black uppercase text-[color:var(--muted)]">Included scope</p>
            <ul className="mt-3 grid gap-3">
              {demoProposal.sections.map((section) => (
                <li
                  key={section}
                  className="flex gap-3 text-sm font-semibold leading-6 text-[color:var(--ink)]"
                >
                  <span
                    className="mt-2 size-2 shrink-0 rounded-full bg-[var(--accent)]"
                    aria-hidden="true"
                  />
                  <span>{section}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </DashboardShell>
  );
}
